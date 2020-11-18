/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com */
"use strict";
const responseMessages = require("../../lib/responseMessages");
const mongoose = require("mongoose");
const user = require("../models/users.model");
const lifestyle = require("../models/lifestyle");
const appearance = require("../models/appearance");
const religious = require("../models/religiousBackground");
const description = require("../models/ownWords");
const education = require("../models/educationCareer");
const hobbies = require("../models/hobbiesInterest");
const personality = require("../models/personalityProfile");
const myMatches = require("../models/myMatches");
const chatLists = require("../models/chatLists");
const utils = require("../common/common-functions");
const _profile = {};

/*  function to add/update basic details*/

_profile.updateUserProfile = async (req, res) => {
  try {
    let criteria = {
      _id: req.user_id,
      role: "user",
    };

    let dataToSet = req.body;
    let options = {
      upsert: true,
      new: true,
      runValidators: true,
    };
    let basicData = await user.findOneAndUpdate(criteria, dataToSet, options);
    criteria = {
      userId: req.user_id,
    };
    let lifestyleData = await lifestyle.findOneAndUpdate(
      criteria,
      dataToSet,
      options
    );
    let appearanceData = await appearance.findOneAndUpdate(
      criteria,
      dataToSet,
      options
    );
    let religiousData = await religious.findOneAndUpdate(
      criteria,
      dataToSet,
      options
    );
    let ownWordsData = await description.findOneAndUpdate(
      criteria,
      dataToSet,
      options
    );
    let educationData = await education.findOneAndUpdate(
      criteria,
      dataToSet,
      options
    );
    let hobbiesData = await hobbies.findOneAndUpdate(
      criteria,
      dataToSet,
      options
    );
    let personalityData = await personality.findOneAndUpdate(
      criteria,
      dataToSet,
      options
    );
    if (!basicData) {
      res.json({
        success: false,
        message: responseMessages.ERRORONUPDATE,
      });
    } else {
      res.json({
        success: true,
        message: responseMessages.DATAADDED,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: responseMessages.ERROR,
    });
  }
};

/*  function for get user profile details*/
_profile.userProfileDetail = async (req, res) => {
  try {
    let userId = mongoose.Types.ObjectId(req.user_id);
    let basicData = await user
      .findOne({ _id: userId })
      .select([
        "firstName",
        "lastName",
        "gender",
        "dob",
        "location",
        "city",
        "country",
        "citizenship",
        "province",
        "memberNumber",
        "profileImg",
      ]);
    let lifestyleData = await lifestyle.findOne({ userId: userId });
    let appearanceData = await appearance.findOne({ userId: userId });
    let religiousData = await religious.findOne({ userId: userId });
    let ownWords = await description.findOne({ userId: userId });
    if (!basicData) {
      res.json({
        success: false,
        message: responseMessages.USERNOTFOUND,
      });
    } else {
      res.json({
        success: true,
        data: {
          basicData: basicData,
          lifestyleData: lifestyleData,
          appearanceData: appearanceData,
          religiousData: religiousData,
          ownWords: ownWords,
        },
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: responseMessages.ERROR,
    });
  }
};

/*  function to add/update education career details*/
_profile.updateUserEducationCareer = async (req, res) => {
  try {
    let criteria = {
      userId: req.user_id,
    };
    let dataToSet = req.body;
    let options = {
      upsert: true,
      new: true,
      runValidators: true,
    };
    let data = await education.findOneAndUpdate(criteria, dataToSet, options);
    if (!data) {
      res.json({
        success: false,
        message: responseMessages.ERRORONUPDATE,
      });
    } else {
      res.json({
        success: true,
        message: responseMessages.DATAADDED,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: responseMessages.ERROR,
    });
  }
};

/*  function for get user education career details*/
_profile.userEducationCareerDetail = async (req, res) => {
  try {
    let userId = req.user_id;
    let data = await education.findOne({ userId: userId });
    if (!data) {
      res.json({
        success: false,
        message: responseMessages.USERNOTFOUND,
      });
    } else {
      res.json({
        success: true,
        data: data,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: responseMessages.ERROR,
    });
  }
};

/*  function to add/update personality profile details*/
_profile.updateUserPersonalityProfile = async (req, res) => {
  try {
    let criteria = {
      userId: req.user_id,
    };
    let dataToSet = req.body;
    let options = {
      upsert: true,
      new: true,
      runValidators: true,
    };
    let data = await personality.findOneAndUpdate(criteria, dataToSet, options);
    if (!data) {
      res.json({
        success: false,
        message: responseMessages.ERRORONUPDATE,
      });
    } else {
      res.json({
        success: true,
        message: responseMessages.DATAADDED,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: responseMessages.ERROR,
    });
  }
};

/*  function for get user personality profile details*/
_profile.userPersonalityProfileDetail = async (req, res) => {
  try {
    let userId = mongoose.Types.ObjectId(req.user_id);
    let data = await personality.findOne({ userId: userId });
    if (!data) {
      res.json({
        success: false,
        message: responseMessages.USERNOTFOUND,
      });
    } else {
      res.json({
        success: true,
        data: data,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: responseMessages.ERROR,
    });
  }
};

/*  function to add/update hobbies & interest*/
_profile.updateUserHobbiesInterest = async (req, res) => {
  try {
    let criteria = {
      userId: req.user_id,
    };
    let dataToSet = req.body;
    let options = {
      upsert: true,
      new: true,
      runValidators: true,
    };
    let data = await hobbies.findOneAndUpdate(criteria, dataToSet, options);
    if (!data) {
      res.json({
        success: false,
        message: responseMessages.ERRORONUPDATE,
      });
    } else {
      res.json({
        success: true,
        message: responseMessages.DATAADDED,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: responseMessages.ERROR,
    });
  }
};

/*  function for get hobbies & interest details*/
_profile.userHobbiesInterestDetail = async (req, res) => {
  try {
    let userId = mongoose.Types.ObjectId(req.user_id);
    let data = await hobbies.findOne({ userId: userId });
    if (!data) {
      res.json({
        success: false,
        message: responseMessages.USERNOTFOUND,
      });
    } else {
      res.json({
        success: true,
        data: data,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: responseMessages.ERROR,
    });
  }
};

_profile.userList = async (req, res) => {
  try {
    let pageNo = parseInt(req.query.pageNo);
    let pageSize = parseInt(req.query.pageSize) || 10;
    if (pageNo <= 0) {
      res.json({
        success: false,
        error: "Invalid page no",
      });
    }
    let projection = {
      role: "user",
      _id: { $ne: mongoose.Types.ObjectId(req.user_id) },
    };

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
      await Promise.all(
        users.map(async (x) => {
          let criteria = {
            $or: [
              {
                $and: [
                  {
                    senderId: req.user_id,
                    receiverId: x._id,
                  },
                ],
              },
              {
                $and: [
                  {
                    receiverId: req.user_id,
                    senderId: x._id,
                  },
                ],
              },
            ],
          };
          let userData = await new Promise((resolve, reject) => {
            chatLists.findOne(criteria, (err, resp) => {
              resolve(resp);
            });
          });
          if (userData) {
            x.role = JSON.stringify(userData);
          } else {
            x.role = "";
          }
          return x;
        })
      );
      res.json({
        success: true,
        data: {
          totalCount: await user.find(projection).countDocuments(),
          users: users,
        },
      });
    }
  } catch (error) {
    throw error;
  }
};
_profile.singleChatDetails = async (req, res) => {
  try {
    let userDeDetails = await user.findById(req.params.id);
    let criteria = {
      $or: [
        {
          $and: [
            {
              senderId: req.user_id,
              receiverId: req.params.id,
            },
          ],
        },
        {
          $and: [
            {
              receiverId: req.user_id,
              senderId: req.params.id,
            },
          ],
        },
      ],
    };

    let chatswithDetail = await chatLists.findOne(criteria);
    if (chatswithDetail) {
      userDeDetails.role = JSON.stringify(chatswithDetail);
    } else {
      userDeDetails.role = "";
    }
    res.json({
      success: true,
      message: responseMessages.RECORDFOUND,
      data: userDeDetails,
    });
  } catch (error) {
    throw error;
  }
};

_profile.updateEmail = async (req, res) => {
  try {
    let criteria = {
      _id: req.user_id,
    };
    let record = req.body;
    let updateEmails = await user.findOneAndUpdate(criteria, record);
    if (updateEmails.name === "MongoError" && updateEmails.code === 11000) {
      res.json({
        success: false,
        message: responseMessages.UNIQUEERROR(
          utils.getFieldFromMsg(user.errmsg)
        ),
      });
    } else {
      res.json({
        success: true,
        message: responseMessages.UPDATEDSUCCESS("email"),
      });
    }
  } catch (err) {
    res.json({
      success: false,
      message: responseMessages.UNIQUEERROR("email"),
    });
  }
};
module.exports = _profile;
