import axios from "axios";

const api = axios.create({
  baseURL: "http://58.74.46.219:61061",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
