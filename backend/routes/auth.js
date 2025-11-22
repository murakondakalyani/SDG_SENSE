const express = require("express");
const router = express.Router();
const { registerUser, login } = require("../controllers/authController");

router.post("/register", registerUser); // ✅ must match
router.post("/login", login);

module.exports = router;
