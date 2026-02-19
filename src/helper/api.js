import axios from "axios";
import { baseURL } from "./helper";
import { getDeviceToken } from "./deviceToken";

const api = axios.create({
  baseURL: baseURL || "https://api.tiptophut.com",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Device-Token": getDeviceToken(),
  },
});

export default api;