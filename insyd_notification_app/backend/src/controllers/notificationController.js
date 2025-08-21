// backend/src/controllers/notificationController.js
const Notification = require("../models/Notification");

/**
 * @desc Get notifications for a user
 * @route GET /api/notifications/:userId
 * @access Public (for POC)
 */
const getNotifications = async (req, res) => {
  try {
    const { userId } = req.params;

    const notifications = await Notification.find({ userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: notifications.length,
      notifications,
    });
  } catch (error) {
    console.error("❌ Error in getNotifications:", error.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

/**
 * @desc Mark a notification as read
 * @route PATCH /api/notifications/:id/read
 */
const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findByIdAndUpdate(
      id,
      { status: "read" },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    res.status(200).json({ success: true, notification });
  } catch (error) {
    console.error("❌ Error in markAsRead:", error.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

module.exports = { getNotifications, markAsRead };
