// backend/src/services/notificationService.js
const Notification = require("../models/Notification");

/**
 * Create a notification
 * @param {String} userId - The user receiving the notification
 * @param {String} type - Notification type (like, comment, follow, etc.)
 * @param {String} content - Message to show
 */
const createNotification = async (userId, type, content) => {
  try {
    const notification = await Notification.create({
      userId,
      type,
      content,
      status: "unread",
    });
    return notification;
  } catch (error) {
    console.error("❌ Error creating notification:", error.message);
    throw new Error("Notification creation failed");
  }
};

/**
 * Get all notifications for a user
 * @param {String} userId
 */
const getUserNotifications = async (userId) => {
  try {
    return await Notification.find({ userId }).sort({ createdAt: -1 });
  } catch (error) {
    console.error("❌ Error fetching notifications:", error.message);
    throw new Error("Failed to fetch notifications");
  }
};

/**
 * Mark notification as read
 * @param {String} id - Notification ID
 */
const markNotificationAsRead = async (id) => {
  try {
    return await Notification.findByIdAndUpdate(
      id,
      { status: "read" },
      { new: true }
    );
  } catch (error) {
    console.error("❌ Error updating notification:", error.message);
    throw new Error("Failed to update notification");
  }
};

module.exports = {
  createNotification,
  getUserNotifications,
  markNotificationAsRead,
};
