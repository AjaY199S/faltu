/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com */
const mongoose = require('mongoose');

module.exports = mongoose.model('personalityProfile', {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  favouriteMovie: { type: String },
  favouriteBooks: { type: String },
  foodLike: { type: String },
  musicLike: { type: String },
  hobbiesInterest: { type: String },
  dressCode: { type: String },
  senseOfHumor: { type: String },
  personality: { type: String },
  travelled: { type: String },
  adaptive: { type: String },
  havingPartnerFromDifferentCulture: { type: String },
  perfectMatch: { type: String },
  languageSpoke: { type: String },
  perfectRomanticWeekend: { type: String },
  qualitiesInvestFutureSpouse: { type: String },
  createdOn: {
    type: Date,
    default: Date.now
  },
  updatedOn: {
    type: Date,
    default: Date.now
  }
});
