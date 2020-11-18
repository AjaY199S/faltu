/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com */
const mongoose = require('mongoose');

module.exports = mongoose.model('hobbiesInterest', {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  foodLike: { type: Array },
  musicLike: { type: Array },
  hobbiesInterest: { type: Array },
  sports: { type: Array },
  createdOn: {
    type: Date,
    default: Date.now
  },
  updatedOn: {
    type: Date,
    default: Date.now
  }
});
