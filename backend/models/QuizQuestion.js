const mongoose = require("mongoose");

const quizQuestionSchema = new mongoose.Schema({
  goal: Number, // SDG goal number (1 to 17)
  question: String,
  options: [String],
  correctAnswer: String
}, { collection: "quizQuestions" });

module.exports = mongoose.model("QuizQuestion", quizQuestionSchema);
