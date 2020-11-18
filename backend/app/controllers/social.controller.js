/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com */
"use strict";

const dotenv = require("dotenv");
const UserController = require("./user.controller");
const facebookAPI = require("../../lib/facebookApi");
const responseMessages = require("../../lib/responseMessages");

dotenv.config();
const _social = {};

_social.fbLogin = async (req, res) => {
  let payloadData = req.body.access_token;
  let data = await facebookAPI.verifyFbToken(payloadData);
  if (data) {
    const payload = {
      fbUserId: data.id
    };
    let userData = await UserController.fbLogin(payload);
    if (!userData) {
      res.json({
        success: false,
        message: responseMessages.USERNOTFOUND
      });
    } else {
      res.json({
        success: true,
        userData: userData
      });
    }
  } else {
    res.json({
      success: false,
      message: responseMessages.ERROR
    });
  }
};

module.exports = _social;
