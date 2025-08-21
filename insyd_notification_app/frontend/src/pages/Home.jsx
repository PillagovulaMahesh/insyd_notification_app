import React, { useState } from "react";
import EventTriggerForm from "../components/EventTriggerForm";
import NotificationList from "../components/NotificationList";

const Home = () => {
  const [userId, setUserId] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
        🔔 Event-Driven Notification System
      </h1>

      {/* Input to select userId */}
      <div className="max-w-md mx-auto mb-6">
        <label className="block text-sm font-medium mb-1">View Notifications for User ID</label>
        <input
          type="text"
          className="w-full border rounded p-2"
          placeholder="Enter userId to fetch notifications"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>

      {/* Trigger Event Form */}
      <EventTriggerForm />

      {/* Notifications */}
      <NotificationList userId={userId} />
    </div>
  );
};

export default Home;
