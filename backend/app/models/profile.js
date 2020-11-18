/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com */
const mongoose = require("mongoose");

module.exports = mongoose.model("profile", {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  firstName: { type: String },
  middleName: { type: String },
  lastName: { type: String },
  image: { type: String },
  gender: { type: String },
  dob: { type: Date },
  age: { type: Number },
  country: { type: String },
  state: { type: String },
  city: { type: String },
  createdOn: {
    type: Date,
    default: Date.now
  },
  citizenship: { type: String },
  updatedOn: {
    type: Date,
    default: Date.now
  }
});
