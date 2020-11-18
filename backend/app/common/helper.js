/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com */
'use strict';
/**
 * require modules
 */
const nodemailer = require('nodemailer');

module.exports = {
  /**
   * for send mail
   */
  sendMail(to, subject, html) {
    var transporter = nodemailer.createTransport({
      // create smtp protocol values
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAILUSER,
        pass: process.env.EMAILPASSWORD
      }
    });
    let mailOptions = {
      // set data for mail options
      from: process.env.EMAILFROM,
      to: to,
      subject: subject,
      html: html
    };
    return new Promise(function(resolve, reject) {
      // use send mail function to send mail to other user
      transporter.sendMail(mailOptions, (err, res) => {
        if (err) {
          // if error reject message
          reject(Error(err));
        } else {
          // else send success into resolve
          resolve(0);
        }
      });
    });
  },

  EMAILHTML(link) {
    return (
      '<div><h3>Click following link for reset your password</h3><a href="' +
      link +
      '">Rest password</a> </div>'
    );
  }
};
