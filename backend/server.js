// 📁 server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const schoolRoutes = require("./routes/school");
require("dotenv").config();

// Import route handlers
const authRoutes = require("./routes/auth");
const quizRoutes = require("./routes/quiz");
const inviteRoutes = require("./routes/invite");
const adminRoutes = require("./routes/admin");
// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // parse JSON request bodies

// API Routes
app.use("/api", authRoutes); 
app.use("/api/quiz", quizRoutes);
app.use("/api/invite", inviteRoutes);
app.use("/api/schools", schoolRoutes);
app.use("/api/admin", adminRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
