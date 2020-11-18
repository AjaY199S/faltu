const mongoose = require("mongoose");

module.exports = mongoose.model("myMatches", {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  matchId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users"
    }
  ]
});
