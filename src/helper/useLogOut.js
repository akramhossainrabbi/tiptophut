import api from "./api";

export const useLogout = () => {
    const logout = async () => {
        try {
            const token = localStorage.getItem("auth_token"); // বা যেখানেই রাখছ

            const res = await api.post(
                "/logout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            localStorage.removeItem("auth_token");
            localStorage.removeItem("user_data");

            return res.data;
        } catch (error) {
            console.error("Logout failed:", error);
            throw error;
        }
    };

    return { logout };
};