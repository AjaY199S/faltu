/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com */
"use strict";

const jwt = require("jsonwebtoken");
const services = require("../services/user.service.js");
const user = require("../models/users.model.js");
const bcrypt = require("bcrypt");
const responseMessages = require("../../lib/responseMessages");
const helper = require("../common/helper");
const crypto = require("crypto");
const utils = require("../common/common-functions");
const uniqueRandom = require("unique-random");
const random = uniqueRandom(1, 100000000000000);
const _user = {};

/*  function to log in*/
_user.login = async (req, res, next) => {
  let payloadData = req.body;
  const criteria = {
    email: payloadData.email,
  };
  let user = await services.getOneUser(criteria);
  if (!user) {
    req.responseData = {
      success: false,
      message: responseMessages.USERNOTFOUND,
    };
    next();
  } else {
    if (user.freeze) {
      req.responseData = {
        success: false,
        message: responseMessages.FREEZEUSER,
      };
      next();
    } else {
      let pwPresent = await bcrypt.compare(payloadData.password, user.password);
      if (pwPresent === true) {
        let token_Data = {
          email: user.email,
          _id: user._id,
          role: user.role,
        };
        let token = jwt.sign(token_Data, process.env.JWT_SECRET, {
          expiresIn: "1d", // expires in 24 hours
        });
        const update = { lastActive: Date.now(), isOnline: true };

        services.updateUser(criteria, update);
        req.responseData = {
          success: true,
          data: {
            user: utils.userProfileModel(user),
            token: token,
          },
          message: responseMessages.LOGINSUCCESSFULL,
        };
        next();
      } else {
        req.responseData = {
          success: false,
          message: responseMessages.PASSWORDNOTMATCH,
        };
        next();
      }
    }
  }
};

/* function to register*/
_user.register = async (req, res, next) => {
  let payloadData = req.body;
  let hash = await bcrypt.hash(
    payloadData.password,

    parseInt(process.env.SALT_ROUNDS)
  );

  payloadData.password = hash;
  payloadData.createdOn = new Date();
  payloadData.memberNumber = random();
  try {
    let checkExist = await user.findOne({ email: req.body.email });
    if (checkExist) {
      req.responseData = {
        success: false,
        message: responseMessages.UNIQUEERROR("Email"),
      };
      next();
    } else {
      let user = await services.createUser(payloadData);
      if (user.name === "MongoError" && user.code === 11000) {
        req.responseData = {
          success: false,
          message: responseMessages.UNIQUEERROR(
            utils.getFieldFromMsg(user.errmsg)
          ),
        };
        next();
      } else {
        req.responseData = {
          success: true,
          message: responseMessages.NEWREGISTRATION,
          userId: user._id,
        };
        next();
      }
    }
  } catch {
    req.responseData = {
      success: false,
      message: responseMessages.REGISTRATIONFAILED,
    };
    next();
  }
};

/**
 * That function used for forget User Password
 */
_user.forgotPassword = async (req, res, next) => {
  let criteria = {
    email: req.body.email,
  };
  let user = await services.getOneUser(criteria);
  if (!user) {
    // if record not found
    req.responseData = {
      success: false,
      message: responseMessages.USERNOTFOUND,
    };
    next();
  } else {
    let token = crypto.randomBytes(20).toString("hex");
    const dataToSet = {
      $set: {
        resetToken: token,
      },
    };
    let option = {};
    let userToUpdate = await services.updateUser(criteria, dataToSet, option);
    if (!userToUpdate) {
      req.responseData = {
        success: false,
        message: responseMessages.ERROR,
      };
      next();
    } else {
      let email = req.body.email;
      let subject = "Reset Password";
      let link = process.env.SERVER_URL + "/resetPassword?" + token;
      let html = helper.EMAILHTML(link);
      let forgotEmail = await helper.sendMail(email, subject, html);
      if (!forgotEmail) {
        req.responseData = {
          success: false,
          message: responseMessages.ERRORONSENDMAIL,
        };
        next();
      } else {
        req.responseData = {
          success: true,
          message: responseMessages.SENTEMAIL,
        };
        next();
      }
    }
  }
};

/**
 * Function is used for reset user password
 */
_user.resetPassword = async (req, res, next) => {
  let payloadData = req.body;
  const criteria = {
    resetToken: req.params.token,
  };
  let user = await services.getOneUser(criteria);
  if (!user) {
    req.responseData = {
      success: false,
      message: responseMessages.USERNOTFOUND,
    };
    next();
  } else {
    if (payloadData.newPassword == payloadData.confirmNewPassword) {
      let newPassword = await bcrypt.hash(
        payloadData.newPassword,
        parseInt(process.env.SALT_ROUNDS)
      );
      const dataToSet = {
        $set: {
          password: newPassword,
          resetToken: null,
        },
      };
      const option = {};
      let userToUpdate = await services.updateUser(criteria, dataToSet, option);
      if (!userToUpdate) {
        req.responseData = {
          success: false,
          message: responseMessages.ERROR,
        };
        next();
      } else {
        req.responseData = {
          success: true,
          message: responseMessages.PASSWORDCHANGED,
        };
        next();
      }
    } else {
      req.responseData = {
        success: false,
        message: responseMessages.PASSWORDNOTMATCH,
      };
      next();
    }
  }
};

_user.logoutUser = async (req, res, next) => {
  if (req.user_id) {
    const update = { lastActive: Date.now(), isOnline: false };
    let logoutUser = await user.findOneAndUpdate({ _id: req.user_id }, update);
    if (logoutUser) {
      req.responseData = {
        success: true,
        message: responseMessages.USEREDITED,
      };
    } else {
      req.responseData = {
        success: false,
        message: responseMessages.USERNOTFOUND,
      };
    }
    next();
  }
};

module.exports = _user;
