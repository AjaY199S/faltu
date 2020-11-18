/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com */
"use strict";

const responseMessages = require("../../lib/responseMessages");
const mongoose = require("mongoose");
const page = require("../models/pages");
const user = require("../models/users.model");
const interest = require("../models/interest");
const favorite = require("../models/favorite");
const profile = require("../models/profile");
const appearance = require("../models/appearance");
const myMatches = require("../models/myMatches");
const fs = require("fs");
const multer = require("multer");
const dir = "./uploads/admin";
const _admin = {};

/*  function to add/update static page*/
_admin.editStaticPage = async (req, res) => {
  try {
    if (req.role === "admin") {
      let criteria = { title: req.body.title };
      let dataToSet = {
        body: req.body.body,
        adminId: mongoose.Types.ObjectId(req.user_id),
      };
      let options = {
        upsert: true,
        new: true,
      };
      let pages = await page.findOneAndUpdate(criteria, dataToSet, options);
      if (!pages) {
        res.json({
          success: false,
          message: responseMessages.ERRORONUPDATE,
        });
      } else {
        res.json({
          success: true,
          message: responseMessages.DATAADDED,
          data: pages,
        });
      }
    } else {
      res.json({
        success: false,
        message: responseMessages.UNAUTHORIZED,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: responseMessages.ERROR,
    });
  }
};

/*  function to get static page*/
_admin.getStaticPage = async (req, res) => {
  try {
    if (req.role) {
      let criteria = {
        title: req.query.title,
      };
      let pages = await page.findOne(criteria).exec();
      if (!pages) {
        res.json({
          success: false,
          message: responseMessages.NODATAFOUND,
        });
      } else {
        res.json({
          success: true,
          data: pages,
        });
      }
    } else {
      res.json({
        success: false,
        message: responseMessages.UNAUTHORIZED,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: responseMessages.ERROR,
    });
  }
};

/*  function to get user list */
_admin.userList = async (req, res) => {
  try {
    if (req.role === "admin") {
      let pageNo = parseInt(req.query.pageNo);
      let pageSize = parseInt(req.query.pageSize) || 10;
      if (pageNo <= 0) {
        res.json({
          success: false,
          error: "Invalid page no",
        });
      }
      let projection = {};
      if (req.query.countryId) {
        projection = {
          role: "user",
          country: req.query.countryId.toString(),
        };
      } else {
        projection = {
          role: "user",
        };
      }
      let users = await user
        .find(projection)
        .skip(pageSize * (pageNo - 1))
        .limit(pageSize)
        .sort({ createdOn: -1 })
        .exec();
      if (!users) {
        res.json({
          success: false,
          message: responseMessages.NODATAFOUND,
        });
      } else {
        res.json({
          success: true,
          data: {
            totalCount: await user.find(projection).countDocuments(),
            users: users,
          },
        });
      }
    } else {
      res.json({
        success: false,
        message: responseMessages.UNAUTHORIZED,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: responseMessages.ERROR,
    });
  }
};

/*  function for get user details*/
_admin.profileDetail = async (req, res) => {
  let userId = mongoose.Types.ObjectId(req.user_id);
  let userData = await profile
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
      userData: userData,
    });
  }
};

/* function for update/upload admin profile*/
_admin.updateProfile = async (req, res) => {
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
      let criteria = {
        _id: mongoose.Types.ObjectId(req.user_id),
      };
      let data = req.body;
      if (req.file) {
        let image = req.file.path;
        data.profileImg = image;
      }
      let options = {
        upsert: true,
        new: true,
      };
      user.findOneAndUpdate(criteria, data, options, function (err, user) {
        if (err) {
          res.json({
            success: false,
            message: err,
          });
        } else {
          res.json({
            success: true,
            message: responseMessages.USEREDITED,
          });
        }
      });
    }
  });
};

/*  function to delete user*/
_admin.deleteUser = async (req, res) => {
  if (req.role === "admin") {
    let criteria = {
      role: "user",
      _id: mongoose.Types.ObjectId(req.body.id),
    };
    let users = await user.findOneAndDelete(criteria);
    if (!users) {
      res.json({
        success: false,
        message: responseMessages.USERNOTFOUND,
      });
    } else {
      res.json({
        success: true,
        message: responseMessages.USERDELETED,
      });
    }
  } else {
    res.json({
      success: false,
      message: responseMessages.UNAUTHORIZED,
    });
  }
};

/*  function to update user*/
_admin.updateUser = async (req, res) => {
  if (req.role === "admin") {
    let data = req.body;
    let criteria = {
      role: "user",
      _id: mongoose.Types.ObjectId(req.body.id),
    };
    let users = await user.findOneAndUpdate(criteria, data);
    if (!users) {
      res.json({
        success: false,
        message: responseMessages.USERNOTFOUND,
      });
    } else {
      res.json({
        success: true,
        message: responseMessages.USEREDITED,
      });
    }
  } else {
    res.json({
      success: false,
      message: responseMessages.UNAUTHORIZED,
    });
  }
};

_admin.updateUserProfile = async (req, res) => {
  try {
    if (req.role === "admin") {
      let updateUserProfile = await user.findOneAndUpdate(
        { _id: req.params.id },
        req.body
      );
      if (updateUserProfile) {
        res.json({
          success: true,
          message: responseMessages.UPDATEDSUCCESS("Record"),
        });
      } else {
        res.json({
          success: false,
          message: responseMessages.NODATAFOUND,
        });
      }
    } else {
      res.json({
        success: false,
        message: responseMessages.UNAUTHORIZED,
      });
    }
  } catch (error) {
    throw error;
  }
};

_admin.dashBoardRecord = async (req, res) => {
  try {
    if (req.role === "admin") {
      let userCount = await user.find({ role: "user" }).countDocuments();
      let interestCount = await interest.find().countDocuments();
      let favoriteCount = await favorite.find().countDocuments();

      let findMutualMatches = await myMatches.find();
      let count = 0;
      for (let i in findMutualMatches) {
        for (let j in findMutualMatches) {
          if (
            findMutualMatches[j].matchId.indexOf(
              findMutualMatches[i].userId
            ) !== -1 &&
            findMutualMatches[i].matchId.indexOf(
              findMutualMatches[j].userId
            ) !== -1
          ) {
            count = count + 1;
          }
        }
      }
      res.json({
        success: true,
        message: responseMessages.RECORDFOUND,
        data: {
          userCount: userCount,
          interestCount: interestCount,
          favoriteCount: favoriteCount,
          mutualMatches: count,
        },
      });
    } else {
      res.json({
        success: false,
        message: responseMessages.UNAUTHORIZED,
      });
    }
  } catch (err) {
    res.json({
      success: false,
      message: responseMessages.ERROR,
    });
  }
};

_admin.topBrides = async (req, res) => {
  try {
    if (req.role === "admin") {
      let topBrides = await user
        .find({ role: "user", gender: "Female" })
        .sort({ createdOn: -1 })
        .limit(5);
      await Promise.all(
        topBrides.map(async (x) => {
          let height = await appearance
            .findOne({ userId: x._id })
            .select("height");
          if (height != "") {
            x.role = JSON.stringify(height);
          } else {
            x.role = "";
          }
          return x;
        })
      );
      res.json({
        success: true,
        message: responseMessages.RECORDFOUND,
        data: topBrides,
      });
    } else {
      res.json({
        success: false,
        message: responseMessages.UNAUTHORIZED,
      });
    }
  } catch (err) {
    res.json({
      success: false,
      message: responseMessages.ERROR,
    });
  }
};

_admin.topGrooms = async (req, res) => {
  try {
    if (req.role === "admin") {
      let topBrides = await user
        .find({ role: "user", gender: "Male" })
        .sort({ createdOn: -1 })
        .limit(5);
      await Promise.all(
        topBrides.map(async (x) => {
          let height = await appearance
            .findOne({ userId: x._id })
            .select("height");
          if (height != "") {
            x.role = JSON.stringify(height);
          } else {
            x.role = "";
          }
          return x;
        })
      );
      res.json({
        success: true,
        message: responseMessages.RECORDFOUND,
        data: topBrides,
      });
    } else {
      res.json({
        success: false,
        message: responseMessages.UNAUTHORIZED,
      });
    }
  } catch (err) {
    res.json({
      success: false,
      message: responseMessages.ERROR,
    });
  }
};

_admin.sortRegisteredUser = async (req, res) => {
  try {
    let registerdUser = await user.aggregate([
      { $match: { role: "user" } },
      {
        $group: {
          _id: {
            year: { $year: "$createdOn" },
            month: { $month: "$createdOn" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1 } },
    ]);
    res.json({
      success: true,
      message: responseMessages.RECORDFOUND,
      data: registerdUser,
    });
  } catch (err) {
    res.json({
      success: false,
      message: responseMessages.ERROR,
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
const upload = multer({ storage: storage }).single("Image");

module.exports = _admin;
