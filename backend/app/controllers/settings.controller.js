/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com */
"use strict";

const user = require("../models/users.model");
const help = require("../models/help");
const profileSetting = require("../models/profileSetting");
const notification = require("../models/notification");
const subscription = require("../models/subscription");
const subscriptionPayment = require("../models/subscriptionPayment");
const mongoose = require("mongoose");
const responseMessages = require("../../lib/responseMessages");
const _setting = {};

_setting.addProfileSetting = async (req, res) => {
  let criteria = {
    userId: mongoose.Types.ObjectId(req.user_id),
  };
  let dataToSave = req.body;
  let options = {
    upsert: true,
    new: true,
  };
  let settingsData = await profileSetting.findOneAndUpdate(
    criteria,
    dataToSave,
    options
  );
  if (settingsData) {
    res.json({
      success: true,
      message: responseMessages.DATAADDED,
    });
  } else {
    res.json({
      success: false,
      message: responseMessages.ERROR,
    });
  }
};

_setting.getProfileSetting = async (req, res) => {
  let getSettings = await profileSetting.findOne({ userId: req.user_id });
  if (getSettings) {
    res.json({
      success: true,
      message: responseMessages.RECORDFOUND,
      data: getSettings,
    });
  } else {
    res.json({
      success: false,
      message: responseMessages.ERROR,
      data: {},
    });
  }
};

_setting.addNotification = async (req, res) => {
  let criteria = {
    userId: mongoose.Types.ObjectId(req.user_id),
  };
  let dataToSave = req.body;
  let options = {
    upsert: true,
    new: true,
  };
  let settingsData = await notification.findOneAndUpdate(
    criteria,
    dataToSave,
    options
  );
  if (settingsData) {
    res.json({
      success: true,
      message: responseMessages.DATAADDED,
    });
  } else {
    res.json({
      success: false,
      message: responseMessages.ERROR,
    });
  }
};

_setting.getNotification = async (req, res) => {
  let getSettings = await notification.findOne({ userId: req.user_id });
  if (getSettings) {
    res.json({
      success: true,
      message: responseMessages.RECORDFOUND,
      data: getSettings,
    });
  } else {
    res.json({
      success: false,
      message: responseMessages.ERROR,
      data: {},
    });
  }
};

_setting.addHelp = async (req, res) => {
  req.body.userId = req.user_id;
  let addHelp = await new help(req.body).save();
  if (addHelp) {
    res.json({
      success: true,
      message: responseMessages.DATAADDED,
      data: addHelp,
    });
  }
};

_setting.addSubscription = async (req, res) => {
  let criteria = {
    userId: req.user_id,
  };
  let dataToSave = req.body;
  let options = {
    upsert: true,
    new: true,
  };

  let addSubsription = await subscription.findOneAndUpdate(
    criteria,
    dataToSave,
    options
  );
  if (addSubsription) {
    res.json({
      success: true,
      message: responseMessages.DATAADDED,
    });
  }
};

_setting.addSubPayment = async (req, res) => {
  try {
    let criteria = {
      userId: req.user_id,
    };
    let dataToSave = Object.assign(criteria, req.body);
    let options = {
      upsert: true,
      new: true,
    };
    let addOrUpdatePayment = await new subscriptionPayment(dataToSave).save();
    if (addOrUpdatePayment) {
      res.json({
        success: true,
        message: responseMessages.DATAADDED,
        data: addOrUpdatePayment,
      });
    } else {
      res.json({
        success: false,
        message: responseMessages.ERROR,
        data: {},
      });
    }
  } catch (err) {
    res.json({
      success: false,
      message: responseMessages.ERROR,
    });
  }
};
_setting.getSubPayment = async (req, res) => {
  let getSubPayment = await subscriptionPayment
    .find({
      userId: req.user_id,
    })
    .sort({ createdOn: -1 });
  if (getSubPayment) {
    res.json({
      success: true,
      message: responseMessages.RECORDFOUND,
      data: getSubPayment,
    });
  } else {
    res.json({
      success: false,
      message: responseMessages.ERROR,
      data: {},
    });
  }
};
module.exports = _setting;
