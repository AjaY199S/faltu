/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com */

"use strict";

const mongoose = require("mongoose");
const subscriptionPayment = require("../models/subscriptionPayment");
const responseMessages = require("../../lib/responseMessages");
const _payments = {};

_payments.listPayments = async (req, res) => {
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
      let reportList = await subscriptionPayment
        .find()
        .populate("userId")
        .skip(pageSize * (pageNo - 1))
        .limit(pageSize)
        .sort({ updatedOn: -1 });
      res.json({
        success: true,
        message: responseMessages.RECORDFOUND,
        totalCount: await subscriptionPayment.find().countDocuments(),
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
      success: true,
      message: responseMessages.ERROR,
    });
  }
};

_payments.viewPaymentDetails = async (req, res) => {
  try {
    if (req.role === "admin") {
      let viewReport = await subscriptionPayment
        .findOne({ _id: req.params.id })
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
      success: true,
      message: responseMessages.ERROR,
    });
  }
};

_payments.removePayment = async (req, res) => {
  try {
    if (req.role === "admin") {
      let removeReport = await subscriptionPayment.findOneAndRemove({
        _id: req.params.id,
      });
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
      success: true,
      message: responseMessages.ERROR,
    });
  }
};

module.exports = _payments;
