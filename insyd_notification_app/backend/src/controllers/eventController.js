// backend/src/controllers/eventController.js
const Event = require("../models/Event");
const Notification = require("../models/Notification");

/**
 * @desc Create an event and generate notification
 * @route POST /api/events
 * @access Public (for POC)
 */
const createEvent = async (req, res) => {
  try {
    const { type, sourceUserId, targetUserId, content } = req.body;

    // Save event
    const event = await Event.create({
      type,
      sourceUserId,
      targetUserId,
      content,
    });

    // Create notification for target user
    const notification = await Notification.create({
      userId: targetUserId,
      type,
      content: `${sourceUserId} ${type} your post`,
      status: "unread",
    });

    res.status(201).json({
      success: true,
      message: "Event created and notification sent",
      event,
      notification,
    });
  } catch (error) {
    console.error("❌ Error in createEvent:", error.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

module.exports = { createEvent };
