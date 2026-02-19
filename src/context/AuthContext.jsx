import React, { createContext, useContext, useState, useCallback } from "react";
import { baseURL, CACHE_KEYS } from "../utils/constants";
import { getDeviceToken } from "../utils/deviceHelper";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const cached = localStorage.getItem(CACHE_KEYS.USER);
            return cached ? JSON.parse(cached) : null;
        } catch (e) {
            return null;
        }
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const setAuthData = (userData, token) => {
        setUser(userData);
        localStorage.setItem(CACHE_KEYS.USER, JSON.stringify(userData));
        localStorage.setItem(CACHE_KEYS.TOKEN, token);
    };

    const login = useCallback(async (credentials) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${baseURL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json", "Accept": "application/json" },
                body: JSON.stringify({ ...credentials, device_token: getDeviceToken() }),
            });
            const json = await res.json();
            if (!res.ok) throw json;
            setAuthData(json.user, json.token);
            return { success: true };
        } catch (err) {
            setError(err);
            return { success: false, error: err };
        } finally {
            setLoading(false);
        }
    }, []);

    const register = useCallback(async (formData) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${baseURL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json", "Accept": "application/json" },
                body: JSON.stringify({ ...formData, device_token: getDeviceToken(), user_type: "customer" }),
            });
            const json = await res.json();
            if (!res.ok) throw json;
            setAuthData(json.user, json.token);
            return { success: true };
        } catch (err) {
            setError(err);
            return { success: false, error: err };
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(async () => {
        const token = localStorage.getItem(CACHE_KEYS.TOKEN);
        try {
            await fetch(`${baseURL}/logout`, {
                method: "POST",
                headers: { "Authorization": `Bearer ${token}`, "Accept": "application/json" }
            });
        } finally {
            setUser(null);
            localStorage.removeItem(CACHE_KEYS.USER);
            localStorage.removeItem(CACHE_KEYS.TOKEN);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, error, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);