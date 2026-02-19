import { v4 as uuidv4 } from "uuid";

export const getDeviceToken = () => {
  let deviceToken = localStorage.getItem("device_token");

  if (!deviceToken) {
    deviceToken = uuidv4();
    localStorage.setItem("device_token", deviceToken);
  }

  return deviceToken;
};