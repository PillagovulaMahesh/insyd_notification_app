import axios from "axios";

const API = axios.create({
  baseURL: "https://your-backend-service.onrender.com/api", // ✅ NOT localhost
});

export default API;
