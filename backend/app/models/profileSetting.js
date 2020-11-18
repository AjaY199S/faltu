/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com */
const mongoose = require("mongoose");

module.exports = mongoose.model("profileSetting", {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  onlineStatus: { type: Boolean, default: true },
  profileDisplay: { type: Boolean, default: true },
  country: { type: String },
  timeStamp: { type: String },
  dateTimeFormat: { type: String },
  measeureUnits: { type: String },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  updatedOn: {
    type: Date,
    default: Date.now,
  },
});
