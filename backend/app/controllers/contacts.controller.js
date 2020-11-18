/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com */
"use strict";

const mongoose = require("mongoose");
const contactUs = require("../models/contactUs");
const responseMessages = require("../../lib/responseMessages");
const _contact = {};

_contact.saveContatUs = async (req, res) => {
  try {
    let saveContatUs = await contactUs.findOneAndUpdate(
      { email: req.body.email },
      req.body,
      { upsert: true, new: true }
    );
    if (saveContatUs) {
      res.json({
        success: true,
        message: responseMessages.RECORDSUCCESS("Contact"),
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

_contact.contactList = async (req, res) => {
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

      let contactList = await contactUs
        .find()
        .skip(pageSize * (pageNo - 1))
        .limit(pageSize)
        .sort({ createdOn: -1 })
        .exec();
      if (!contactList) {
        res.json({
          success: false,
          message: responseMessages.NODATAFOUND,
        });
      } else {
        res.json({
          success: true,
          data: {
            totalCount: await contactUs.find().countDocuments(),
            data: contactList,
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

_contact.removeContacts = async (req, res) => {
  try {
    if (req.role === "admin") {
      let removeContacts = await contactUs.findOneAndRemove({
        _id: req.params.id,
      });
      if (removeContacts) {
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
  } catch (error) {
    res.json({
      success: false,
      message: responseMessages.ERROR,
    });
  }
};

module.exports = _contact;
