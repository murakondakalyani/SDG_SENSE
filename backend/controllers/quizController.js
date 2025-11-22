const QuizScore = require("../models/QuizScore");

// POST /api/quiz/submit
exports.submitQuiz = async (req, res) => {
  try {
    const { userId, username, goal, score } = req.body;
    const newScore = new QuizScore({
      userId,
      username,
      goal,
      score,
      timestamp: new Date()
    });
    await newScore.save();
    res.status(201).json({ message: "Quiz score saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save quiz score", details: error.message });
  }
};

// GET /api/quiz/user/:id
exports.getUserScores = async (req, res) => {
  try {
    const scores = await QuizScore.find({ userId: req.params.id }).sort({ timestamp: -1 });
    res.json(scores);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch scores", details: error.message });
  }
};



// GET /api/quiz/all (Optional: for leaderboard)
exports.getAllScores = async (req, res) => {
  try {
    const scores = await QuizScore.find().sort({ timestamp: -1 });
    res.json(scores);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch all scores", details: error.message });
  }
};
