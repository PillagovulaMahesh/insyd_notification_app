import axios from "axios";

// Set your backend URL (change if deployed)
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ----------------- Event APIs -----------------
export const triggerEvent = (eventData) =>
  API.post("/events", eventData);

// ----------------- Notification APIs -----------------
export const getNotifications = (userId) =>
  API.get(`/notifications/${userId}`);

export const markNotificationAsRead = (id) =>
  API.patch(`/notifications/${id}/read`);

export default API;
