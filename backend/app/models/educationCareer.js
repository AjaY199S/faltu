/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com */
const mongoose = require('mongoose');

module.exports = mongoose.model('educationCareer', {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  currentlyWorkingAt: { type: String },
  designation: { type: String },
  organization: { type: String },
  organizationLocation: { type: String },
  salaryRange: { type: String },
  highestDegree: { type: String },
  createdOn: {
    type: Date,
    default: Date.now
  },
  updatedOn: {
    type: Date,
    default: Date.now
  }
});
