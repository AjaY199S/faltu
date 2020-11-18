/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com */
"use strict";

const mongoose = require("mongoose");
const users = require("../models/users.model");
const interest = require("../models/interest");
const favorite = require("../models/favorite");
const profileViewed = require("../models/profileViewed");
const blocked = require("../models/blocked");
const reports = require("../models/reports");
const responseMessages = require("../../lib/responseMessages");
const _activity = {};

_activity.addInterest = async (req, res) => {
  try {
    let criteria = {
      userId: req.user_id,
      interestUserId: req.body.interestUserId,
    };
    let criteriass = {
      userId: req.user_id,
      interestUserId: req.body.interestUserId,
      createdOn: Date.now(),
      updatedOn: Date.now(),
    };
    let addInterest = await interest.findOneAndUpdate(criteria, criteriass, {
      upsert: true,
      new: true,
    });
    let dataToSet = { $addToSet: { interestUserId: req.body.interestUserId } };
    let criterias = {
      _id: req.user_id,
    };
    let result = await users.findOneAndUpdate(criterias, dataToSet);
    if (addInterest) {
      res.json({
        success: true,
        message: responseMessages.RECORDSUCCESS("Interest"),
      });
    } else {
      res.json({
        success: true,
        message: responseMessages.ERROR,
      });
    }
  } catch (err) {
    res.json({
      success: true,
      message: responseMessages.ERROR,
    });
  }
};

_activity.removeInterest = async (req, res) => {
  try {
    let criteria = {
      _id: req.user_id,
    };
    let criterias = {
      userId: req.user_id,
      interestUserId: req.params.interestUserId,
    };
    let removeInterest = await interest.findOneAndRemove(criterias, criterias);
    let dataToSet = { $pull: { interestUserId: req.params.interestUserId } };
    let result = await users.findOneAndUpdate(criteria, dataToSet);
    if (result) {
      res.json({
        success: true,
        message: responseMessages.REMOVEDSUCCESS("Interest"),
      });
    } else {
      res.json({
        success: true,
        message: responseMessages.ERROR,
      });
    }
  } catch (err) {
    res.json({
      success: true,
      message: responseMessages.ERROR,
    });
  }
};

_activity.getInterest = async (req, res) => {
  try {
    let currentUserDetails = await users.findById(req.user_id);
    let limit = parseInt(req.params.limit);
    let page = req.params.limit * (req.params.offest - 1);
    let type = req.params.type;
    let getInterestedCandidate = [];
    if (type === "1" || type === "2" || type === "3" || type === "4") {
      let sorting = {};
      if (type === "1") {
        sorting = { createdOn: -1 };
      } else if (type === "2") {
        let filterTye = 1;
        if (currentUserDetails.gender && currentUserDetails.gender === "Male") {
          filterTye = -1;
        }
        sorting = { "interestUserId.gender": filterTye };
      }
      getInterestedCandidate = await interest.aggregate([
        {
          $match: { userId: mongoose.Types.ObjectId(req.user_id) },
        },
        {
          $lookup: {
            from: "media",
            localField: "interestUserId",
            foreignField: "userId",
            as: "userDetails",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "interestUserId",
            foreignField: "_id",
            as: "interestUserId",
          },
        },
        { $unwind: "$interestUserId" },
        { $sort: sorting },
        { $skip: page },
        { $limit: limit },
      ]);
    }
    res.json({
      success: true,
      message: responseMessages.RECORDFOUND,
      totalCount: await interest.find({ userId: req.user_id }).countDocuments(),
      data: getInterestedCandidate,
    });
  } catch (err) {
    res.json({
      success: true,
      message: responseMessages.ERROR,
    });
  }
};

_activity.interestedInMe = async (req, res) => {
  try {
    let currentUserDetails = await users.findById(req.user_id);
    let limit = parseInt(req.params.limit);
    let page = req.params.limit * (req.params.offest - 1);
    let type = req.params.type;
    let getInterestedCandidate = [];

    if (type === "1" || type === "2" || type === "3" || type === "4") {
      let sorting = {};
      if (type === "1") {
        sorting = { createdOn: -1 };
      } else if (type === "2") {
        let filterTye = 1;
        if (currentUserDetails.gender && currentUserDetails.gender === "Male") {
          filterTye = -1;
        }
        sorting = { "interestUserId.gender": filterTye };
      }
      getInterestedCandidate = await interest.aggregate([
        {
          $match: { interestUserId: mongoose.Types.ObjectId(req.user_id) },
        },
        {
          $lookup: {
            from: "media",
            localField: "userId",
            foreignField: "userId",
            as: "userDetails",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "interestUserId",
          },
        },
        { $unwind: "$interestUserId" },
        { $sort: sorting },
        { $skip: page },
        { $limit: limit },
      ]);
    }
    res.json({
      success: true,
      message: responseMessages.RECORDFOUND,
      totalCount: await interest
        .find({ interestUserId: req.user_id })
        .countDocuments(),
      data: getInterestedCandidate,
    });
  } catch (err) {
    res.json({
      success: true,
      message: responseMessages.ERROR,
    });
  }
};

_activity.addFavorite = async (req, res) => {
  try {
    let criteria = {
      userId: req.user_id,
      favoriteUserId: req.body.favoriteUserId,
    };
    let criteriass = {
      userId: req.user_id,
      favoriteUserId: req.body.favoriteUserId,
      createdOn: Date.now(),
      updatedOn: Date.now(),
    };
    let result = await favorite.findOneAndUpdate(criteria, criteriass, {
      upsert: true,
      new: true,
    });
    let dataToSet = { $addToSet: { favoriteUserId: req.body.favoriteUserId } };
    let criterias = {
      _id: req.user_id,
    };
    let data = await users.findOneAndUpdate(criterias, dataToSet);
    if (result) {
      res.json({
        success: true,
        message: responseMessages.DATAADDED,
      });
    } else {
      res.json({
        success: true,
        message: responseMessages.ERROR,
      });
    }
  } catch (err) {
    res.json({
      success: true,
      message: responseMessages.ERROR,
    });
  }
};

_activity.removeFavorite = async (req, res) => {
  try {
    let criteria = {
      _id: req.user_id,
    };
    let criterias = {
      userId: req.user_id,
      favoriteUserId: req.params.favoriteUserId,
    };
    let removeFavorite = await favorite.findOneAndRemove(criterias, criterias);
    let dataToSet = { $pull: { favoriteUserId: req.params.favoriteUserId } };
    let result = await users.findOneAndUpdate(criteria, dataToSet);
    if (result) {
      res.json({
        success: true,
        message: responseMessages.REMOVEDSUCCESS("Favorite"),
      });
    } else {
      res.json({
        success: true,
        message: responseMessages.ERROR,
      });
    }
  } catch (err) {
    res.json({
      success: true,
      message: responseMessages.ERROR,
    });
  }
};

_activity.getFavorite = async (req, res) => {
  try {
    let currentUserDetails = await users.findById(req.user_id);
    let limit = parseInt(req.params.limit);
    let page = req.params.limit * (req.params.offest - 1);
    let type = req.params.type;
    let getInterestedCandidate = [];
    if (type === "1" || type === "2" || type === "3" || type === "4") {
      let sorting = {};
      if (type === "1") {
        sorting = { createdOn: -1 };
      } else if (type === "2") {
        let filterTye = 1;
        if (currentUserDetails.gender && currentUserDetails.gender === "Male") {
          filterTye = -1;
        }
        sorting = { "favoriteUserId.gender": filterTye };
      }
      getInterestedCandidate = await favorite.aggregate([
        {
          $match: { userId: mongoose.Types.ObjectId(req.user_id) },
        },
        {
          $lookup: {
            from: "media",
            localField: "favoriteUserId",
            foreignField: "userId",
            as: "userDetails",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "favoriteUserId",
            foreignField: "_id",
            as: "favoriteUserId",
          },
        },
        { $unwind: "$favoriteUserId" },
        { $sort: sorting },
        { $skip: page },
        { $limit: limit },
      ]);
    }
    res.json({
      success: true,
      message: responseMessages.RECORDFOUND,
      totalCount: await favorite.find({ userId: req.user_id }).countDocuments(),
      data: getInterestedCandidate,
    });
  } catch (err) {
    res.json({
      success: true,
      message: responseMessages.ERROR,
    });
  }
};

_activity.favoriteMe = async (req, res) => {
  try {
    let currentUserDetails = await users.findById(req.user_id);
    let limit = parseInt(req.params.limit);
    let page = req.params.limit * (req.params.offest - 1);
    let type = req.params.type;
    let getInterestedCandidate = [];
    if (type === "1" || type === "2") {
      let sorting = {};
      if (type === "1") {
        sorting = { createdOn: -1 };
      } else if (type === "2") {
        let filterTye = 1;
        if (currentUserDetails.gender && currentUserDetails.gender === "Male") {
          filterTye = -1;
        }
        sorting = { "favoriteUserId.gender": filterTye };
      }
      getInterestedCandidate = await favorite.aggregate([
        {
          $match: { favoriteUserId: mongoose.Types.ObjectId(req.user_id) },
        },
        {
          $lookup: {
            from: "media",
            localField: "userId",
            foreignField: "userId",
            as: "userDetails",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "favoriteUserId",
          },
        },
        { $unwind: "$favoriteUserId" },
        { $sort: sorting },
        { $skip: page },
        { $limit: limit },
      ]);
    }
    res.json({
      success: true,
      message: responseMessages.RECORDFOUND,
      totalCount: await favorite
        .find({ favoriteUserId: req.user_id })
        .countDocuments(),
      data: getInterestedCandidate,
    });
  } catch (err) {
    res.json({
      success: true,
      message: responseMessages.ERROR,
    });
  }
};

_activity.addView = async (req, res) => {
  try {
    let criteria = {
      userId: req.user_id,
      profileViewdUserId: req.body.profileViewdUserId,
    };
    let criteriass = {
      userId: req.user_id,
      profileViewdUserId: req.body.profileViewdUserId,
      createdOn: Date.now(),
      updatedOn: Date.now(),
    };
    let result = await profileViewed.findOneAndUpdate(criteria, criteriass, {
      upsert: true,
      new: true,
    });
    let dataToSet = {
      $addToSet: { profileViewdUserId: req.body.profileViewdUserId },
    };
    let criterias = {
      _id: req.user_id,
    };
    let data = await users.findOneAndUpdate(criterias, dataToSet);
    if (result) {
      res.json({
        success: true,
        message: responseMessages.DATAADDED,
      });
    } else {
      res.json({
        success: true,
        message: responseMessages.ERROR,
      });
    }
  } catch (err) {
    res.json({
      success: true,
      message: responseMessages.ERROR,
    });
  }
};

_activity.getView = async (req, res) => {
  try {
    let currentUserDetails = await users.findById(req.user_id);
    let limit = parseInt(req.params.limit);
    let page = req.params.limit * (req.params.offest - 1);
    let type = req.params.type;
    let getInterestedCandidate = [];
    if (type === "1" || type === "2" || type === "3" || type === "4") {
      let sorting = {};
      if (type === "1") {
        sorting = { createdOn: -1 };
      } else if (type === "2") {
        let filterTye = 1;
        if (currentUserDetails.gender && currentUserDetails.gender === "Male") {
          filterTye = -1;
        }
        sorting = { "profileViewdUserId.gender": filterTye };
      }
      getInterestedCandidate = await profileViewed.aggregate([
        {
          $match: { userId: mongoose.Types.ObjectId(req.user_id) },
        },
        {
          $lookup: {
            from: "media",
            localField: "profileViewdUserId",
            foreignField: "userId",
            as: "userDetails",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "profileViewdUserId",
            foreignField: "_id",
            as: "profileViewdUserId",
          },
        },
        { $unwind: "$profileViewdUserId" },
        { $sort: sorting },
        { $skip: page },
        { $limit: limit },
      ]);
    }
    res.json({
      success: true,
      message: responseMessages.RECORDFOUND,
      totalCount: await profileViewed
        .find({ userId: req.user_id })
        .countDocuments(),
      data: getInterestedCandidate,
    });
  } catch (err) {
    res.json({
      success: true,
      message: responseMessages.ERROR,
    });
  }
};

_activity.viewedMe = async (req, res) => {
  try {
    let currentUserDetails = await users.findById(req.user_id);
    let limit = parseInt(req.params.limit);
    let page = req.params.limit * (req.params.offest - 1);
    let type = req.params.type;
    let getInterestedCandidate = [];
    if (type === "1" || type === "2") {
      let sorting = {};
      if (type === "1") {
        sorting = { createdOn: -1 };
      } else if (type === "2") {
        let filterTye = 1;
        if (currentUserDetails.gender && currentUserDetails.gender === "Male") {
          filterTye = -1;
        }
        sorting = { "profileViewdUserId.gender": filterTye };
      }
      getInterestedCandidate = await profileViewed.aggregate([
        {
          $match: { profileViewdUserId: mongoose.Types.ObjectId(req.user_id) },
        },
        {
          $lookup: {
            from: "media",
            localField: "userId",
            foreignField: "userId",
            as: "userDetails",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "profileViewdUserId",
          },
        },
        { $unwind: "$profileViewdUserId" },
        { $sort: sorting },
        { $skip: page },
        { $limit: limit },
      ]);
    }
    res.json({
      success: true,
      message: responseMessages.RECORDFOUND,
      totalCount: await profileViewed
        .find({ profileViewdUserId: req.user_id })
        .countDocuments(),
      data: getInterestedCandidate,
    });
  } catch (err) {
    res.json({
      success: true,
      message: responseMessages.ERROR,
    });
  }
};

_activity.blockUser = async (req, res) => {
  try {
    let criteria = {
      userId: req.user_id,
      blockUserId: req.body.blockUserId,
    };
    let criteriass = {
      userId: req.user_id,
      blockUserId: req.body.blockUserId,
      createdOn: Date.now(),
      updatedOn: Date.now(),
    };
    let result = await blocked.findOneAndUpdate(criteria, criteriass, {
      upsert: true,
      new: true,
    });
    let dataToSet = {
      $addToSet: { blockUserId: req.body.blockUserId },
    };
    let criterias = {
      _id: req.user_id,
    };
    let data = await users.findOneAndUpdate(criterias, dataToSet);
    if (result) {
      res.json({
        success: true,
        message: responseMessages.DATAADDED,
      });
    } else {
      res.json({
        success: true,
        message: responseMessages.ERROR,
      });
    }
  } catch (err) {
    res.json({
      success: true,
      message: responseMessages.ERROR,
    });
  }
};

_activity.getBlocked = async (req, res) => {
  try {
    let currentUserDetails = await users.findById(req.user_id);
    let limit = parseInt(req.params.limit);
    let page = req.params.limit * (req.params.offest - 1);
    let type = req.params.type;
    let getInterestedCandidate = [];
    if (type === "1" || type === "2" || type === "3" || type === "4") {
      let sorting = {};
      if (type === "1") {
        sorting = { createdOn: -1 };
      } else if (type === "2") {
        let filterTye = 1;
        if (currentUserDetails.gender && currentUserDetails.gender === "Male") {
          filterTye = -1;
        }
        sorting = { "blockUserId.gender": filterTye };
      }
      getInterestedCandidate = await blocked.aggregate([
        {
          $match: { userId: mongoose.Types.ObjectId(req.user_id) },
        },
        {
          $lookup: {
            from: "media",
            localField: "blockUserId",
            foreignField: "userId",
            as: "userDetails",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "blockUserId",
            foreignField: "_id",
            as: "blockUserId",
          },
        },
        { $unwind: "$blockUserId" },
        { $sort: sorting },
        { $skip: page },
        { $limit: limit },
      ]);
    }
    res.json({
      success: true,
      message: responseMessages.RECORDFOUND,
      totalCount: await blocked.find({ userId: req.user_id }).countDocuments(),
      data: getInterestedCandidate,
    });
  } catch (err) {
    res.json({
      success: true,
      message: responseMessages.ERROR,
    });
  }
};

_activity.unblockUser = async (req, res) => {
  try {
    let criteria = {
      _id: req.user_id,
    };
    let criterias = {
      userId: req.user_id,
      blockUserId: req.params.blockUserId,
    };
    let removeFavorite = await blocked.findOneAndRemove(criterias, criterias);
    let dataToSet = { $pull: { blockUserId: req.params.blockUserId } };
    let result = await users.findOneAndUpdate(criteria, dataToSet);
    if (result) {
      res.json({
        success: true,
        message: responseMessages.REMOVEDSUCCESS("Block"),
      });
    } else {
      res.json({
        success: true,
        message: responseMessages.ERROR,
      });
    }
  } catch (err) {
    res.json({
      success: true,
      message: responseMessages.ERROR,
    });
  }
};

_activity.addReport = async (req, res) => {
  try {
    let criteria = {
      userId: req.user_id,
      reportedUserId: req.body.reportedUserId,
    };
    let criteriass = {
      userId: req.user_id,
      reportedUserId: req.body.reportedUserId,
      createdOn: Date.now(),
      updatedOn: Date.now(),
    };
    let result = await reports.findOneAndUpdate(criteria, criteriass, {
      upsert: true,
      new: true,
    });
    let dataToSet = {
      $addToSet: { reportedUserId: req.body.reportedUserId },
    };
    let criterias = {
      _id: req.user_id,
    };
    let data = await users.findOneAndUpdate(criterias, dataToSet);
    if (result) {
      res.json({
        success: true,
        message: responseMessages.DATAADDED,
      });
    } else {
      res.json({
        success: true,
        message: responseMessages.ERROR,
      });
    }
  } catch (err) {
    res.json({
      success: true,
      message: responseMessages.ERROR,
    });
  }
};

_activity.removeReport = async (req, res) => {
  try {
    let criteria = {
      _id: req.user_id,
    };
    let criterias = {
      userId: req.user_id,
      reportedUserId: req.params.reportedUserId,
    };
    let removeFavorite = await reports.findOneAndRemove(criterias, criterias);
    let dataToSet = { $pull: { reportedUserId: req.params.reportedUserId } };
    let result = await users.findOneAndUpdate(criteria, dataToSet);
    if (result) {
      res.json({
        success: true,
        message: responseMessages.REMOVEDSUCCESS("Report"),
      });
    } else {
      res.json({
        success: true,
        message: responseMessages.ERROR,
      });
    }
  } catch (err) {
    res.json({
      success: true,
      message: responseMessages.ERROR,
    });
  }
};
module.exports = _activity;
