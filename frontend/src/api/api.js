import axios from "axios";

const getBackendBaseUrl = () => {
  const rawUrl = import.meta.env.VITE_API_URL || window.location.origin;

  return rawUrl.replace(/\/api\/?$/, "").replace(/\/$/, "");
};

const api = axios.create({
  baseURL: `${getBackendBaseUrl()}/api`
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
