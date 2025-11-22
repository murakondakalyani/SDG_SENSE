const mongoose = require("mongoose");

const inviteSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  institute: String,
  location: String,
  timestamp: { type: Date, default: Date.now }
}, { collection: "invites" });

module.exports = mongoose.model("Invite", inviteSchema);
