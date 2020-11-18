/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com */

"use strict";

const mongoose = require("mongoose");
const feedback = require("../models/feedback");
const responseMessages = require("../../lib/responseMessages");
const _feedback = {};

_feedback.addFeedBack = async (req, res) => {
  try {
    req.body.userId = req.user_id;
    let addFeedBack = await new feedback(req.body).save();
    if (addFeedBack) {
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
  } catch (err) {
    res.json({
      success: false,
      message: responseMessages.ERROR,
    });
  }
};

_feedback.feedbackLists = async (req, res) => {
  try {
    let pageNo = parseInt(req.query.pageNo);
    let pageSize = parseInt(req.query.pageSize) || 10;
    if (pageNo <= 0) {
      res.json({
        success: false,
        error: "Invalid page no",
      });
    }
    let projection = {};
    if (req.query.rating) {
      projection = {
        rating: req.query.rating,
      };
    }
    let order = {
      createdOn: -1,
    };
    let feedbackLists = await feedback
      .find(projection)
      .populate("userId")
      .skip(pageSize * (pageNo - 1))
      .limit(pageSize)
      .sort(order)
      .exec();
    if (!feedbackLists) {
      res.json({
        success: false,
        message: responseMessages.NODATAFOUND,
      });
    } else {
      res.json({
        success: true,
        data: {
          totalCount: await feedback.find(projection).countDocuments(),
          oneStar: await feedback.find({ rating: 1 }).countDocuments(),
          twoStar: await feedback.find({ rating: 2 }).countDocuments(),
          threeStar: await feedback.find({ rating: 3 }).countDocuments(),
          fourStar: await feedback.find({ rating: 4 }).countDocuments(),
          fiveStar: await feedback.find({ rating: 5 }).countDocuments(),
          users: feedbackLists,
        },
      });
    }
  } catch (err) {
    res.json({
      success: false,
      message: responseMessages.ERROR,
    });
  }
};

_feedback.updateFeedback = async (req, res) => {
  try {
    let updateInfo = await feedback.findOneAndUpdate(
      { userId: req.user_id },
      req.body,
      {
        upsert: true,
        new: true,
      }
    );
    if (updateInfo) {
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
  } catch (err) {
    res.json({
      success: false,
      message: responseMessages.ERROR,
    });
  }
};

_feedback.deleteRecord = async (req, res) => {
  try {
    if (req.role === "admin") {
      let deleteRecord = await feedback.findOneAndDelete({
        _id: req.params.id,
      });
      if (deleteRecord) {
        res.json({
          success: true,
          message: responseMessages.REMOVEDSUCCESS("Record"),
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
  } catch (err) {
    res.json({
      success: false,
      message: responseMessages.ERROR,
    });
  }
};

_feedback.getSingleReview = async (req, res) => {
  try {
    let getSingleReview = await feedback.findOne({ userId: req.user_id });
    if (getSingleReview) {
      res.json({
        success: true,
        message: responseMessages.REMOVEDSUCCESS("Record"),
        data: getSingleReview,
      });
    } else {
      res.json({
        success: false,
        message: responseMessages.NODATAFOUND,
      });
    }
  } catch (err) {
    res.json({
      success: false,
      message: responseMessages.ERROR,
    });
  }
};
module.exports = _feedback;
