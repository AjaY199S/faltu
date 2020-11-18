/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com */
const mongoose = require("mongoose");

module.exports = mongoose.model("subscriptionPayment", {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  transactionId: { type: String },
  plan: { type: String },
  timePeriod: { type: String },
  amount: { type: String },
  paymentMethod: { type: String },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  citizenship: { type: String },
  updatedOn: {
    type: Date,
    default: Date.now,
  },
});
