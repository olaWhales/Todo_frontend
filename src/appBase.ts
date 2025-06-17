import axios from "axios";
import { useAuth } from "./App"; // Adjust path if needed

const api = axios.create({
  baseURL: "http://localhost:8080/api", // Match your backend API base URL
});

// Interceptor to attach fresh token before each request
api.interceptors.request.use(async (config) => {
  const { token } = useAuth(); // Use context token
  if (token) {
    config.headers = config.headers || {};
    (config.headers as any).Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;