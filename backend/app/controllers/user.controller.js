/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com */
"use strict";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const responseMessages = require("../../lib/responseMessages");
const multer = require("multer");
const fs = require("fs");
const mongoose = require("mongoose");
const dir = "./uploads/users";
const services = require("../services/user.service.js");
const media = require("../models/media");
const user = require("../models/users.model");
const appearance = require("../models/appearance");
const chatLists = require("../models/chatLists");
const _user = {};

/*  function to update password*/
_user.updatePassword = async (req, res, next) => {
  let id = req.user_id;
  let data = req.body;
  let criteria = {
    _id: mongoose.Types.ObjectId(id),
  };
  let user = await services.getOneUser(criteria);
  if (!user) {
    req.responseData = {
      success: false,
      message: responseMessages.USERNOTFOUND,
    };
    next();
  } else {
    let pwPresent = await bcrypt.compare(data.password, user.password);
    if (pwPresent === true) {
      let hash = await bcrypt.hash(
        data.newPassword,
        parseInt(process.env.SALT_ROUNDS)
      );
      if (hash) {
        let dataToSet = {
          password: hash,
        };
        let option = { new: true };
        let userToUpdate = await services.updateUser(
          criteria,
          dataToSet,
          option
        );
        if (!userToUpdate) {
          req.responseData = {
            success: false,
            message: responseMessages.ERROR,
          };
          next();
        } else {
          req.responseData = {
            success: true,
            message: responseMessages.PASSWORDCHANGED,
          };
          next();
        }
      }
    } else {
      req.responseData = {
        success: false,
        message: responseMessages.PASSWORDNOTMATCH,
      };
      next();
    }
  }
};

/* function for upload user image*/
_user.uploadUserImg = async (req, res) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  upload(req, res, async (err) => {
    if (err) {
      res.json({
        success: false,
        message: err,
      });
    } else {
      let photos = JSON.parse(JSON.stringify(req.files));
      if (Object.entries(photos).length === 0) {
        res.json({
          sucess: false,
          message: responseMessages.NOIMAGE,
        });
        return;
      }
      let criteria = {
        userId: mongoose.Types.ObjectId(req.user_id),
      };
      let dataToSave = photos;
      dataToSave.createdOn = Date.now();
      dataToSave.updatedOn = Date.now();
      let options = {
        upsert: true,
        new: true,
      };
      let userData = await media.findOneAndUpdate(
        criteria,
        dataToSave,
        options
      );
      let updateUser = await user.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(req.user_id) },
        { imageUpdate: Date.now() }
      );
      if (!userData) {
        res.json({
          success: false,
          message: responseMessages.ERRORONUPDATE,
        });
      } else {
        let criteria = {
          _id: mongoose.Types.ObjectId(req.user_id),
        };
        let option = photos.Image1
          ? {
              $set: {
                profileImg: photos.Image1[0].path,
              },
            }
          : {};
        await services.updateUser(criteria, option);
        res.json({
          sucess: true,
          message: responseMessages.IMAGEUPLOADED,
        });
      }
    }
  });
};

/* function get user image*/
_user.media = async (req, res) => {
  let userId = mongoose.Types.ObjectId(req.user_id);
  let userData = await media
    .findOne({ userId: userId })
    .populate({ path: "userId", select: "email" });
  if (!userData) {
    res.json({
      success: false,
      message: responseMessages.NODATAFOUND,
    });
  } else {
    res.json({
      success: true,
      data: userData,
    });
  }
};
/* function to get other user image*/
_user.getOtherUserMedia = async (req, res) => {
  let userId = mongoose.Types.ObjectId(req.params.id);
  let userData = await media
    .findOne({ userId: userId })
    .populate({ path: "userId", select: "email" });
  if (!userData) {
    res.json({
      success: false,
      message: responseMessages.NODATAFOUND,
    });
  } else {
    res.json({
      success: true,
      data: userData,
    });
  }
};

/* function for user exists*/
_user.userExists = async (req, res) => {
  let userId = mongoose.Types.ObjectId(req.user_id);
  let userData = await user.findOne({ _id: userId });
  if (!userData) {
    res.json({
      success: false,
      message: responseMessages.NODATAFOUND,
    });
  } else {
    res.json({
      success: true,
      data: userData,
    });
  }
};

var storage = multer.diskStorage({
  /* destination*/
  destination: function (req, file, cb) {
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getTime().toString() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage }).fields([
  {
    name: "Image1",
    maxCount: 1,
  },
  {
    name: "Image2",
    maxCount: 1,
  },
  {
    name: "Image3",
    maxCount: 1,
  },
  {
    name: "Image4",
    maxCount: 1,
  },
]);

/* function for fb login*/
_user.fbLogin = async (req, res) => {
  let criteria = {
    payloadData: req,
  };
  let user = await services.getOneUser(criteria);
  if (!user) {
    payloadData.password = bcrypt.hash(
      payloadData.newPassword,
      parseInt(process.env.SALT_ROUNDS)
    );
    let userToCreate = await services.createUser(payloadData);
    if (!userToCreate) {
      res.json({
        success: false,
        message: responseMessages.REGISTRATIONFAILED,
      });
    } else {
      let token_Data = {
        id: userToCreate._id,
        fbUserId: userToCreate.fbUserId,
      };
      let token = jwt.sign(token_Data, process.env.JWT_SECRET, {
        expiresIn: "1d", // expires in 24 hours
      });
      res.json({
        success: true,
        data: userToCreate,
        token: token,
      });
    }
  } else {
    res.json({
      success: true,
      message: responseMessages.LOGINSUCCESSFULL,
      data: user,
    });
  }
};

_user.chats = async (req, res) => {
  let criteria = {
    $or: [
      {
        $and: [
          {
            senderId: req.user_id,
            receiverId: req.body.receiverId,
          },
        ],
      },
      {
        $and: [
          {
            receiverId: req.user_id,
            senderId: req.body.receiverId,
          },
        ],
      },
    ],
  };
  let dataToSet = {
    senderId: req.user_id,
    receiverId: req.body.receiverId,
    text: req.body.text ? req.body.text : "",
    msgType: req.body.msgType,
    timeStamp: req.body.timeStamp,
  };
  let options = {
    upsert: true,
    new: true,
  };
  let chatData = await chatLists.findOneAndUpdate(criteria, dataToSet, options);
  if (chatData) {
    res.json({
      success: true,
      message: responseMessages.DATAADDED,
      data: chatData,
    });
  } else {
    res.json({
      success: true,
      data: responseMessages.NODATAFOUND,
    });
  }
};

_user.getChatId = async (req, res) => {
  let criteria = {
    $or: [
      {
        $and: [
          {
            senderId: req.user_id,
            receiverId: req.body.receiverId,
          },
        ],
      },
      {
        $and: [
          {
            receiverId: req.user_id,
            senderId: req.body.receiverId,
          },
        ],
      },
    ],
  };
  let chatId = await chatLists.findOne(criteria);
  if (chatId) {
    let criterias = {};
    if (chatId.senderId == req.user_id) {
      criterias = {
        chatClickSender: true,
        senderMsgCount: 0,
      };
    } else {
      criterias = {
        chatClickReceiver: true,
        reciverMsgCount: 0,
      };
    }
    let updateChat = await chatLists.findOneAndUpdate(
      { _id: chatId._id },
      criterias
    );
  }
  res.json({
    success: true,
    message: responseMessages.RECORDFOUND,
    data: chatId,
  });
};

_user.updateChat = async (req, res) => {
  try {
    let criteria = {
      $or: [
        {
          $and: [
            {
              senderId: req.user_id,
              receiverId: req.params.receiverId,
            },
          ],
        },
        {
          $and: [
            {
              receiverId: req.user_id,
              senderId: req.params.receiverId,
            },
          ],
        },
      ],
    };
    let updateChat = await chatLists.findOneAndUpdate(criteria, req.body);
    res.json({
      success: true,
      message: responseMessages.UPDATEDSUCCESS("Record"),
    });
  } catch (err) {
    throw err;
  }
};

_user.deletechat = async (req, res) => {
  try {
    let criteria = {
      _id: req.params.chatId,
    };
    let findChat = await chatLists.findById(req.params.chatId);
    let updateData = {
      deleteChatByReceiver: req.user_id,
      userDetails: "",
    };
    if (req.user_id === findChat.senderId) {
      updateData = {
        deleteChatBySender: req.user_id,
        userDetails: "",
      };
    }
    let updateRecord = await chatLists.findOneAndUpdate(criteria, updateData);
    res.json({
      success: true,
      message: responseMessages.UPDATEDSUCCESS("Record"),
    });
  } catch (err) {
    res.json({
      success: true,
      message: responseMessages.ERROR,
    });
  }
};

_user.deletedChatList = async (req, res) => {
  try {
    let pageNo = parseInt(req.query.pageNo);
    let pageSize = parseInt(req.query.pageSize) || 10;
    if (pageNo <= 0) {
      res.json({
        success: false,
        error: "Invalid page no",
      });
    }
    let criteria = {
      $and: [
        {
          $or: [
            {
              senderId: req.user_id,
            },
            {
              receiverId: req.user_id,
            },
          ],
        },
        {
          $or: [
            {
              deleteChatByReceiver: mongoose.Types.ObjectId(req.user_id),
            },
            {
              deleteChatBySender: mongoose.Types.ObjectId(req.user_id),
            },
          ],
        },
      ],
    };
    let chatList = await chatLists
      .find(criteria)
      .skip(pageSize * (pageNo - 1))
      .limit(pageSize)
      .sort({ updatedOn: -1 })
      .exec();
    if (chatList.length > 0) {
      await Promise.all(
        chatList.map(async (x) => {
          let userId = x.senderId;
          if (x.senderId == req.user_id) {
            userId = x.receiverId;
          }
          let userData = await user.findOne({ _id: userId });
          x.userDetails = await JSON.stringify(userData);
          return x;
        })
      );
    }
    res.json({
      success: true,
      data: {
        totalCount: await chatLists.find(criteria).countDocuments(),
        users: chatList,
      },
    });
  } catch (err) {
    res.json({
      success: true,
      message: responseMessages.ERROR,
    });
  }
};

_user.removeDeletedChat = async (req, res) => {
  try {
    let criteria = {
      $and: [
        {
          $or: [
            {
              senderId: req.user_id,
            },
            {
              receiverId: req.user_id,
            },
          ],
        },
        {
          _id: req.params.chatId,
        },
      ],
    };

    let getData = await chatLists.findOne(criteria);
    if (getData) {
      let updateData = {
        deleteChatByReceiver: 1,
      };
      if (req.user_id === getData.senderId) {
        updateData = {
          deleteChatBySender: 1,
        };
      }
      let deleteChatData = await chatLists.findOneAndUpdate(
        { _id: getData._id },
        { $unset: updateData }
      );
      if (deleteChatData) {
        res.json({
          success: true,
          message: responseMessages.RECORDDELETE,
        });
      } else {
        res.json({
          success: true,
          message: responseMessages.NODATAFOUND,
        });
      }
    } else {
      res.json({
        success: true,
        message: responseMessages.UNAUTHORIZED,
      });
    }
  } catch (err) {
    res.json({
      success: true,
      message: responseMessages.ERROR,
    });
  }
};

_user.featuredProfiles = async (req, res) => {
  try {
    let criteria = {
      role: "user",
    };
    let userLists = await user.find(criteria).sort({ createdOn: -1 }).limit(10);
    await Promise.all(
      userLists.map(async (data) => {
        let userDetails = await appearance.findOne({ userId: data._id });
        if (userDetails) {
          data.password = JSON.stringify(userDetails);
        } else {
          data.password = "";
        }
        return data;
      })
    );
    res.json({
      success: true,
      message: responseMessages.RECORDFOUND,
      data: userLists,
    });
  } catch (err) {
    throw err;
    res.json({
      success: true,
      message: responseMessages.NODATAFOUND,
    });
  }
};
module.exports = _user;
