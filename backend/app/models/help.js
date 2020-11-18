/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com */
const mongoose = require("mongoose");
const validator = require("validator");

module.exports = mongoose.model("help", {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  fullName: { type: String },
  email: {
    type: String,
    required: true,
    validate: (value) => {
      return validator.isEmail(value);
    },
  },
  comments: { type: String },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  updatedOn: {
    type: Date,
    default: Date.now,
  },
});
