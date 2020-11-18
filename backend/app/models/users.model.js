/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com */
const mongoose = require("mongoose");
const validator = require("validator");
module.exports = mongoose.model("users", {
  email: {
    type: String,
    required: true,
    unique: true,
    validate: (value) => {
      return validator.isEmail(value);
    },
  },
  fbUserId: { type: String },
  password: { type: String, required: true },
  verificationCode: { type: String },
  Bio: { type: String },
  type: { type: String, default: "web" },
  isVerified: { type: Boolean, default: false },
  freeze: { type: Boolean, default: false },
  role: { type: String, default: "user" },
  dob: { type: Date },
  age: { type: Number },
  memberNumber: { type: Number },
  firstName: { type: String },
  lastName: { type: String },
  phoneNo: { type: String },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  memberNumber: { type: Number },
  profileImg: { type: String },
  createdFor: {
    type: String,
    enum: [
      "Self",
      "Son",
      "Daughter",
      "Brother",
      "Sister",
      "Relative",
      "Friend",
    ],
  },
  country: { type: String },
  province: { type: String },
  city: { type: String },
  citizenship: { type: String },
  subscription: {
    type: String,
    default: "standard",
  },
  resetToken: { type: String },
  isOnline: { type: Boolean, default: false },
  lastActive: {
    type: Date,
    default: Date.now,
  },
  interestUserId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      // unique: true,
    },
  ],
  favoriteUserId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      // unique: true,
    },
  ],
  profileViewdUserId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      // unique: true,
    },
  ],
  blockUserId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      // unique: true,
    },
  ],
  reportedUserId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      // unique: true,
    },
  ],
  imageUpdate: {
    type: Date,
    default: Date.now(),
  },
  createdOn: {
    type: Date,
  },
  updatedOn: {
    type: Date,
    default: Date.now,
  },
});
