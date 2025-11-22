const express = require("express");
const router = express.Router();
const isAdmin = require("../middleware/isAdmin");
const User = require("../models/User");


// GET all users (admin only)
router.get("/all-users", isAdmin, async (req, res) => {
  try {
    const users = await User.find().sort({ schoolName: 1, fullName: 1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to load users", details: err.message });
  }
});

module.exports = router;
