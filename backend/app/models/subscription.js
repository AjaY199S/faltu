/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com */
const mongoose = require("mongoose");
const validator = require("validator");

module.exports = mongoose.model("subscription", {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  platinum: { type: String },
  gold: { type: String },
  payment: { type: String },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  updatedOn: {
    type: Date,
    default: Date.now,
  },
});
