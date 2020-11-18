/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com */
const mongoose = require('mongoose');

module.exports = mongoose.model('appearance', {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  hairColor: { type: String },
  hairLength: { type: String },
  hairType: { type: String },
  eyeColor: { type: String },
  eyeWear: { type: String },
  height: { type: Number },
  weight: { type: Number },
  bodyType: { type: String },
  facialHair: { type: String },
  ethnicity: { type: String },
  complexion: { type: String },
  considerMyselfAs: { type: String },
  physicalAndHealthStatus: { type: String },
  createdOn: {
    type: Date,
    default: Date.now
  },
  updatedOn: {
    type: Date,
    default: Date.now
  }
});
