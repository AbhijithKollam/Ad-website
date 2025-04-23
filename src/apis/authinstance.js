import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = "https://ads.planetmedia.app";
const API_KEY = "a19c77e7-93a4-4e6d-9abe-a5983cda353d";

const authInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY,
  },
  timeout: 10000,
});

authInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token.trim()}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("Error Response:", error.response);
      switch (error.response.status) {
        case 401:
          console.error("Unauthorized - Please log in again.");
          sessionStorage.removeItem("token");
          window.location.href = "/";
          break;
        case 403:
          toast.error("Forbidden - You don't have permission.");
          break;
        case 404:
          toast.error("Not Found - The requested resource was not found.");
          break;
        case 500:
          toast.error("Server Error - Try again later.");
          break;
        default:
          toast.error("An error occurred:", error.response.data.message);
      }
    } else if (error.request) {
      console.error("No response from server. Check your network.");
    } else {
      console.error("Request error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default authInstance;
