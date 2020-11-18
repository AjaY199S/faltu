/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com */
const mongoose = require("mongoose");

module.exports = mongoose.model("notification", {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  subscribedPlan: { type: Boolean, default: true },
  receivesMsg: { type: Boolean, default: true },
  profileViewed: { type: Boolean, default: true },
  interestedMe: { type: Boolean, default: true },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  updatedOn: {
    type: Date,
    default: Date.now,
  },
});
