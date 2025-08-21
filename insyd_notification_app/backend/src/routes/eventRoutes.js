// backend/src/routes/eventRoutes.js
const express = require("express");
const { createEvent } = require("../controllers/eventController");

const router = express.Router();

// @route   POST /api/events
// @desc    Create an event & notification
router.post("/", createEvent);

module.exports = router;
