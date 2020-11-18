/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com */
const mongoose = require('mongoose');

module.exports = mongoose.model('personality', {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true
  },
  interestsPersonality: { type: String },
  likeToRead: { type: String },
  hobbies: { type: Array },
  musicLike: { type: String },
  dressSenseAndPhysicalAppearance: { type: String },
  senseOfHumor: { type: String },
  personality: { type: String },
  adaptiveToHavingPartnerFromDifferentCulture: { type: String },
  perfectMatch: { type: String },
  perfectRomanticWeekend: { type: String },
  createdOn: {
    type: Date,
    default: Date.now
  },
  updatedOn: {
    type: Date,
    default: Date.now
  }
});
