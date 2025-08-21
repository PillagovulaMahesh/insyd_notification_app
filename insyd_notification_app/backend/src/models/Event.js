// backend/src/models/Event.js
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true, // e.g., "like", "comment", "follow"
    },
    sourceUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    targetUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String, // e.g., "User A liked your post"
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
