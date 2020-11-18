/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com */
const mongoose = require('mongoose');

module.exports = mongoose.model('partnerPreferences', {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true
  },
  Seeking: { type: String },
  Age: { type: Number },
  country: { type: String },
  state: { type: String },
  city: { type: String },
  within: { type: String },
  height: { type: String },
  weight: { type: String },
  bodyType: { type: String },
  ethnicity: { type: String },
  considerTheirAppearance: { type: String },
  hairColor: { type: String },
  doTheySmoke: { type: Boolean },
  doTheyDrink: { type: Boolean },
  willingToRelocate: { type: Boolean },
  maritalStatus: { type: String },
  haveChildren: { type: Boolean },
  nationality: { type: String },
  education: { type: String },
  languagesSpoken: { type: Array },
  religion: { type: String },
  born: { type: Date },
  religiousValues: { type: String },
  createdOn: {
    type: Date,
    default: Date.now
  },
  updatedOn: {
    type: Date,
    default: Date.now
  }
});
