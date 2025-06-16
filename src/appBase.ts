// apiBase.ts
import axios from "axios";
import { keycloakInstance } from "./Keycloak";

const api = axios.create({
  baseURL: "/api",
});

// Interceptor to attach fresh token before each request
api.interceptors.request.use(async (config) => {
  if (keycloakInstance.token) {
    try {
      await keycloakInstance.updateToken(70);
      config.headers = config.headers || {};
      (config.headers as any).set('Authorization', `Bearer ${keycloakInstance.token}`);
    } catch (error) {
      console.error("Token update failed:", error);
      // Optional: handle logout or redirect to login
    }
  }
  return config;
});

export default api;
