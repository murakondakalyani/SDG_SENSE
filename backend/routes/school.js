const express = require("express");
const router = express.Router();
const User = require("../models/User");

// GET /api/schools/:schoolName
router.get("/:schoolName", async (req, res) => {
  try {
    const users = await User.find({ schoolName: req.params.schoolName });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users", details: err.message });
  }
});

module.exports = router;
