/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com */
const mongoose = require('mongoose');

module.exports = mongoose.model('lifestyle', {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  doYouDrink: { type: String },
  doYouSmoke: { type: String },
  eatingHabits: { type: String },
  maritalStatus: { type: String, default: 'single' },
  doYouHaveChildren: { type: String },
  numberOfChildren: { type: Number, default: 0 },
  oldestChild: { type: Number },
  youngestChild: { type: Number },
  wantMoreChild: { type: String },
  occupation: { type: String },
  employmentStatus: { type: String },
  annualIncome: { type: String },
  homeType: { type: String },
  livingSituation: { type: String },
  residencyStatus: { type: String },
  willingToRelocate: { type: String },
  relationshipYouAreLookingFor: { type: String },
  createdOn: {
    type: Date,
    default: Date.now
  },
  updatedOn: {
    type: Date,
    default: Date.now
  }
});
