import { baseURL, assetsURL } from "../utils/constants";

export { baseURL, assetsURL };


export const token = localStorage.getItem("auth_token");
export const userData = JSON.parse(localStorage.getItem("user_data"));

