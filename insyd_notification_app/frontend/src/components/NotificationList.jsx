import React, { useEffect, useState } from "react";
import axios from "axios";

const NotificationList = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/notifications/${userId}`
      );
      setNotifications(res.data);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to fetch notifications");
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/notifications/${id}/read`
      );
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error(err);
      alert("❌ Failed to mark as read");
    }
  };

  useEffect(() => {
    if (userId) {
      fetchNotifications();
    }
  }, [userId]);

  if (!userId) {
    return <p className="text-gray-500">⚠️ Please provide a userId</p>;
  }

  if (loading) {
    return <p className="text-blue-500">Loading notifications...</p>;
  }

  return (
    <div className="p-4 bg-white shadow rounded-lg max-w-md mx-auto mt-4">
      <h2 className="text-xl font-bold mb-3">Notifications</h2>
      {notifications.length === 0 ? (
        <p className="text-gray-500">No notifications</p>
      ) : (
        <ul className="space-y-2">
          {notifications.map((n) => (
            <li
              key={n._id}
              className={`p-2 border rounded ${
                n.read ? "bg-gray-100" : "bg-yellow-50"
              }`}
            >
              <p>{n.message}</p>
              <small className="text-gray-500">
                {new Date(n.createdAt).toLocaleString()}
              </small>
              {!n.read && (
                <button
                  onClick={() => markAsRead(n._id)}
                  className="ml-2 text-sm text-blue-600 hover:underline"
                >
                  Mark as read
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationList;
