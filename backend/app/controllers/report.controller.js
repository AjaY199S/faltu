/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com */

"use strict";

const mongoose = require("mongoose");
const users = require("../models/users.model");
const reports = require("../models/reports");
const responseMessages = require("../../lib/responseMessages");
const _report = {};

_report.listReport = async (req, res) => {
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
      let reportList = await reports
        .find()
        .populate("reportedUserId")
        .populate("userId")
        .skip(pageSize * (pageNo - 1))
        .limit(pageSize)
        .sort({ updatedOn: -1 });
      res.json({
        success: true,
        message: responseMessages.RECORDFOUND,
        totalCount: await reports
          .find({ role: { $ne: "admin" } })
          .countDocuments(),
        data: reportList,
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

_report.viewReport = async (req, res) => {
  try {
    if (req.role === "admin") {
      let viewReport = await reports
        .findOne({ _id: req.params.id })
        .populate("reportedUserId")
        .populate("userId");
      res.json({
        success: true,
        message: responseMessages.RECORDFOUND,
        data: viewReport,
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

_report.removeReport = async (req, res) => {
  try {
    if (req.role === "admin") {
      let removeReport = await reports.findOneAndRemove({ _id: req.params.id });
      res.json({
        success: true,
        message: responseMessages.REMOVEDSUCCESS("Record"),
        data: [],
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

_report.updateBlock = async (req, res) => {
  try {
    if (req.role === "admin") {
      let updateBlock = await users.findOneAndUpdate(
        { _id: req.body.id },
        { freeze: req.body.freeze }
      );
      if (updateBlock) {
        res.json({
          success: false,
          message: responseMessages.UPDATEDSUCCESS("Record"),
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

module.exports = _report;
