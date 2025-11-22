const express = require("express");
const router = express.Router();
const isAdmin = require("../middleware/isAdmin");
const { submitQuiz, getUserScores, getAllScores } = require("../controllers/quizController");
const QuizQuestion = require("../models/QuizQuestion");

// Submit a quiz score
router.post("/submit", submitQuiz);

// Get quiz scores for a specific user
router.get("/user/:id", getUserScores);

// (Optional) Get all quiz scores for leaderboard
router.get("/all", getAllScores);

// routes/quiz.js
router.get("/questions", isAdmin, async (req, res) => {
  try {
    const questions = await QuizQuestion.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch questions" });
  }
});

module.exports = router;
