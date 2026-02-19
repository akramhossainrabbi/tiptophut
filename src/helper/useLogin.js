import { toast } from "react-toastify";
import api from "./api";
import { getDeviceToken } from "./deviceToken";
import { useAuth } from "../context/AuthContext";

export const useLogin = () => {
  const { login: setAuthUser } = useAuth(); // 👈 rename

  const login = async (LoginData) => {
    try {
      const response = await api.post("/login", {
        email: LoginData.email,
        password: LoginData.password,
        device_token: getDeviceToken(),
      });

      const loginData = response.data;
      const { token, user } = loginData;
      localStorage.setItem("auth_token", token);
      localStorage.setItem("user_data", JSON.stringify(user));

      setAuthUser(user); 

      toast.success(loginData.message || "Login successful!");
      return loginData;

    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Invalid email or password");
      } else {
        toast.error(error.response?.data?.message || "Login failed");
      }
      return null;
    }
  };

  return { login };
};