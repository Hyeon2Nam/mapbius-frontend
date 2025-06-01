import axios from "axios";

const api = axios.create({
  baseURL: "http://183.107.82.189:8080",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
