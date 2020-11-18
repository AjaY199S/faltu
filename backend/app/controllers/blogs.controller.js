/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com */
"use strict";

const mongoose = require("mongoose");
const blogs = require("../models/blogs");
const responseMessages = require("../../lib/responseMessages");
const _blogs = {};

_blogs.saveBlogs = async (req, res) => {
  try {
    if (req.role === "admin") {
      req.body.userId = req.user_id;
      let saveBlogs = await new blogs(req.body).save();
      res.json({
        success: true,
        message: responseMessages.DATAADDED,
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
_blogs.blogsList = async (req, res) => {
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
      let reportList = await blogs
        .find()
        .skip(pageSize * (pageNo - 1))
        .limit(pageSize)
        .sort({ createdOn: -1 });
      res.json({
        success: true,
        message: responseMessages.RECORDFOUND,
        totalCount: await blogs.find().countDocuments(),
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

_blogs.removeBlogs = async (req, res) => {
  try {
    if (req.role === "admin") {
      let removeBlogs = await blogs.findOneAndRemove({ _id: req.params.id });
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

_blogs.updateBlogs = async (req, res) => {
  try {
    if (req.role === "admin") {
      let updateBlogs = await blogs.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(req.params.id) },
        req.body
      );
      if (updateBlogs) {
        res.json({
          success: true,
          message: responseMessages.UPDATEDSUCCESS("Record"),
          data: [],
        });
      } else {
        res.json({
          success: false,
          message: responseMessages.NODATAFOUND,
          data: [],
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
      success: true,
      message: responseMessages.ERROR,
    });
  }
};

module.exports = _blogs;
