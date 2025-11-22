const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  username: String,
  password: String,
  schoolName: String,
  classGrade: String,
  age: Number,
  gender: String,
  role: {
    type: String,
    default: "user"
  }
});

module.exports = mongoose.model("User", userSchema);
