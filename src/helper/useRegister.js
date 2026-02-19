import { toast } from "react-toastify";
import { getDeviceToken } from "./deviceToken";
import { baseURL } from "./helper";

export const useRegister = () => {

    const registerUser = async (userRegInfo) => {
        try {
            const deviceToken = await getDeviceToken(); // ✅ FIX

            const res = await fetch(`${baseURL}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({
                    first_name: userRegInfo.first_name,
                    email: userRegInfo.email,
                    password: userRegInfo.password,
                    password_confirmation: userRegInfo.password_confirmation,
                    device_token: deviceToken,
                    user_type: userRegInfo.user_type,
                }),
            });

            const data = await res.json();
            const { token, user } = data;
            localStorage.setItem("auth_token", token);
            localStorage.setItem("user_data", JSON.stringify(user));

            if (!res.ok) {
                // ❌ console.error নাই
                toast.error(data.message || "Registration failed");
                return false;
            }

            // ✅ success toast
            toast.success(data.message || "Registration successful!");

            

            return data;
        } catch (error) {
            if (error.response) {
                if (error.response.status === 409) {
                    toast.error("Invalid email or password");
                } else {
                    toast.error(error.response.data?.message || "Login failed");
                }
            } else {
                toast.error("Server not reachable");
            }
            return null;
        }
    };

    return { registerUser };
};
