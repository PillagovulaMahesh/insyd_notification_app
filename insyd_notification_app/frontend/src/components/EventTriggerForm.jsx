import React, { useState } from "react";
import axios from "axios";

const EventTriggerForm = () => {
  const [eventType, setEventType] = useState("like");
  const [userId, setUserId] = useState("");
  const [targetUserId, setTargetUserId] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/events", {
        type: eventType,
        userId,
        targetUserId,
        message,
      });

      alert("✅ Event Triggered: " + res.data.message);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to trigger event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-3">Trigger Event</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm font-medium">Event Type</label>
          <select
            className="w-full border rounded p-2"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
          >
            <option value="like">Like</option>
            <option value="comment">Comment</option>
            <option value="follow">Follow</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">User ID</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Event initiator userId"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Target User ID</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={targetUserId}
            onChange={(e) => setTargetUserId(e.target.value)}
            placeholder="Target userId to notify"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Message</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Optional custom message"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Triggering..." : "Trigger Event"}
        </button>
      </form>
    </div>
  );
};

export default EventTriggerForm;
