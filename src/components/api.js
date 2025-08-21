import axios from "axios";

const API = axios.create({
  baseURL: "http://django-admin-pro.onrender.com/",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
