/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com */
const mongoose = require('mongoose');

module.exports = mongoose.model('profile', {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true
  },
  fatherName: { type: String },
  fatherAge: { type: Number },
  fatherWorkingAt: { type: String },
  motherName: { type: String },
  motherAge: { type: Number },
  motherWorkingAt: { type: String },
  siblings: { type: Array },
  createdOn: {
    type: Date,
    default: Date.now
  },
  updatedOn: {
    type: Date,
    default: Date.now
  }
});
