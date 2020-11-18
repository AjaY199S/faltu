/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com */
const mongoose = require("mongoose");

module.exports = mongoose.model("chatLists", {
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  text: { type: String },
  image: { type: String },
  video: { type: String },
  location: { lat: 0.0, lng: 0.0 },
  timeStamp: { type: String },
  senderMsgCount: { type: Number, default: 0 },
  reciverMsgCount: { type: Number, default: 0 },
  chatClickSender: { type: Boolean, default: false },
  chatClickReceiver: { type: Boolean, default: false },
  userDetails: { type: String },
  deleteChatBySender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  deleteChatByReceiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  msgType: { type: Number, required: true, enum: [1, 2, 3, 4] }, //1=>string,2=>image,3=>video,4=>location
  createdOn: {
    type: Date,
    default: Date.now,
  },
  updatedOn: {
    type: Date,
    default: Date.now,
  },
});
