import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { baseURL, CACHE_KEYS, CACHE_EXPIRY } from "../utils/constants";

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 1. Fetch Logic
    const fetchSettings = useCallback(async () => {
        // Try Cache First
        try {
            const cached = localStorage.getItem(CACHE_KEYS.SETTINGS);
            if (cached) {
                const { data, timestamp } = JSON.parse(cached);
                if (Date.now() - timestamp < CACHE_EXPIRY.SETTINGS) {
                    setSettings(data);
                    setLoading(false);
                    return;
                }
            }
        } catch (e) {
            console.warn("Settings cache invalid");
        }

        // Fetch from API
        setLoading(true);
        try {
            const response = await fetch(`${baseURL}/version2/init/general-settings`);
            if (!response.ok) throw new Error("Failed to fetch settings");
            
            const json = await response.json();
            setSettings(json);

            // Save to Cache
            localStorage.setItem(CACHE_KEYS.SETTINGS, JSON.stringify({
                data: json,
                timestamp: Date.now()
            }));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    // 2. Initial Load
    useEffect(() => {
        fetchSettings();
    }, [fetchSettings]);

    // 3. Derived Data
    const generalSettings = settings?.data?.general_setting || {};

    return (
        <SettingsContext.Provider value={{ generalSettings, loading, error, refetch: fetchSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useAppSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) throw new Error('useAppSettings must be used within SettingsProvider');
    return context;
};