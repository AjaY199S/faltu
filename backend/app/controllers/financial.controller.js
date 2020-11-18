/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com */

"use strict";

const mongoose = require("mongoose");
const financialInfo = require("../models/financialInfo");
const responseMessages = require("../../lib/responseMessages");
const _financial = {};

_financial.addFinancialInfo = async (req, res) => {
  try {
    if (req.role === "admin") {
      let addFinancialInfo = await new financialInfo(req.body).save();
      if (addFinancialInfo) {
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

_financial.listFinancial = async (req, res) => {
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
      let listFinancial = await financialInfo
        .find()
        .skip(pageSize * (pageNo - 1))
        .limit(pageSize)
        .sort({ createdOn: -1 })
        .exec();
      if (!listFinancial) {
        res.json({
          success: false,
          message: responseMessages.NODATAFOUND,
        });
      } else {
        res.json({
          success: true,
          data: {
            totalCount: await financialInfo.find().countDocuments(),
            users: listFinancial,
          },
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

_financial.updateInfo = async (req, res) => {
  try {
    if (req.role === "admin") {
      let updateInfo = await financialInfo.findOneAndUpdate(
        { _id: req.params.id },
        req.body
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

_financial.deleteRecord = async (req, res) => {
  try {
    if (req.role === "admin") {
      let deleteRecord = await financialInfo.findOneAndDelete({
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

module.exports = _financial;
