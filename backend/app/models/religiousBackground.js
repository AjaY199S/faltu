/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com */
const mongoose = require('mongoose');

module.exports = mongoose.model('religiousBackground', {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  nationality: { type: String },
  education: { type: String },
  languagesSpoken: { type: Array },
  religion: { type: String },
  bornReverted: { type: String },
  religiousValues: { type: String },
  attendReligiousServices: { type: String },
  readQuran: { type: String },
  polygamy: { type: String },
  familyValues: { type: String },
  profileCreator: { type: String },
  createdOn: {
    type: Date,
    default: Date.now
  },
  updatedOn: {
    type: Date,
    default: Date.now
  }
});
