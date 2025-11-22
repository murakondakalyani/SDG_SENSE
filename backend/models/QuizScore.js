const mongoose = require("mongoose");

const quizScoreSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  username: String,
  fullname: String,
  schoolName: String,
  goal: Number,
  score: Number,
  timestamp: { type: Date, default: Date.now }
}, { collection: "results" });

module.exports = mongoose.model("QuizScore", quizScoreSchema);
