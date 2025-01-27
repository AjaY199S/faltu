﻿/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com */
const mongoose = require("mongoose");

module.exports = mongoose.model("advanceSearch", {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  gender: { type: String },
  seeking: { type: String },
  age: { type: Number },
  lastActive: { type: Date },
  sortResultsBy: { type: String },
  profileImg: { type: Boolean },
  singleCountry: { type: Boolean, default: false },
  hasPhoto: { type: String, default: "off" },
  multipleCountry: { type: Boolean, default: false },
  country: { type: String },
  province: { type: String },
  city: { type: String },
  within: { type: String },
  relationshipYouAreLookingFor: { type: String },
  bodyType: { type: Array },
  ethnicity: { type: Array },
  minweight: { type: Number },
  maxweight: { type: Number },
  minheight: { type: Number },
  maxheight: { type: Number },
  complexion: { type: Array },
  considerTheirAppearanceAs: { type: Array },
  hairColor: { type: Array },
  hairLength: { type: Array },
  hairType: { type: Array },
  eyeColor: { type: Array },
  eyeWear: { type: Array },
  facialHair: { type: Array },
  physicalAndHealthStatus: { type: Array },
  doYouDrink: { type: Array },
  doYouSmoke: { type: Array },
  eatingHabits: { type: Array },
  maritalStatus: { type: Array },
  doYouHaveChildren: { type: Array },
  numberOfChildren: { type: Number },
  oldestChild: { type: Number },
  youngestChild: { type: Number },
  wantMoreChild: { type: Array },
  occupation: { type: Array },
  employmentStatus: { type: Array },
  annualIncome: { type: String },
  homeType: { type: Array },
  livingSituation: { type: Array },
  residencyStatus: { type: Array },
  willingToRelocate: { type: Array },
  relationshipYouAreLookingFor: { type: String },
  nationality: { type: String },
  education: { type: Array },
  languagesSpoken: { type: Array },
  religion: { type: Array },

  bornReverted: { type: Array },
  religiousValues: { type: Array },
  attendReligiousServices: { type: Array },
  readQuran: { type: Array },
  polygamy: { type: Array },
  familyValues: { type: Array },
  profileCreator: { type: Array },
  savedSearchearchAs: { type: String },
  asiaArray: { type: Array },
  caribbeanArray: { type: Array },
  europe1Array: { type: Array },
  europe2Array: { type: Array },
  europe2Array: { type: Array },
  austrailiaNewArray: { type: Array },
  latinAmericaArray: { type: Array },
  centralAsiaArray: { type: Array },
  northAmericaArray: { type: Array },
  islandArray: { type: Array },
  createdOn: {
    type: Date,
    default: Date.now
  },
  updatedOn: {
    type: Date,
    default: Date.now
  }
});
