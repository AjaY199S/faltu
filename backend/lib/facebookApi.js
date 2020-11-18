/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com */
'use strict';

/*
 * Library for verifying and setting data
 */

// Dependencies
const request = require('request');
const responseMessages = require('./responseMessages');

// Container for module (to be exported)
const _service = {};

_service.verifyFbToken = async (req, res) => {
  request(
    `https://graph.facebook.com/me?access_token=${req}`,
    { json: true },
    (error, response, body) => {
      if (response && response.statusCode == 400) {
        return {
          success: false,
          message: responseMessages.CODENOTMATCHED
        };
      } else if (response && response.statusCode == 200) {
        return {
          success: true,
          data: body
        };
      } else {
        return {
          success: false,
          message: responseMessages.ERRORONVERIFICATION
        };
      }
    }
  );
};

// Export the module
module.exports = _service;
