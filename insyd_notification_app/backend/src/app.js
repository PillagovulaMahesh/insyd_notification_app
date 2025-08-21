// backend/src/app.js
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// Routes
const eventRoutes = require("./routes/eventRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

const app = express();

// 🔹 Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON bodies
app.use(morgan("dev")); // Log HTTP requests in dev mode

// 🔹 API routes
app.use("/api/events", eventRoutes);
app.use("/api/notifications", notificationRoutes);

// 🔹 Health check route
app.get("/", (req, res) => {
  res.send("✅ Notification Service API is running...");
});

// 🔹 Error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({
    success: false,
    error: err.message || "Server error",
  });
});

module.exports = app;
