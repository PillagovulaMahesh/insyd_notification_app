// backend/src/routes/notificationRoutes.js
const express = require("express");
const {
  getNotifications,
  markAsRead,
} = require("../controllers/notificationController");

const router = express.Router();

// @route   GET /api/notifications/:userId
// @desc    Get all notifications for a user
router.get("/:userId", getNotifications);

// @route   PATCH /api/notifications/:id/read
// @desc    Mark notification as read
router.patch("/:id/read", markAsRead);

module.exports = router;
