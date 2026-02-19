import { useState, useCallback } from "react";
import { baseURL, CACHE_KEYS, CACHE_EXPIRY } from "../utils/constants";

const useMenus = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(false); // Start false for lazy load
  const [error, setError] = useState(null);

  const getCachedData = useCallback((key) => {
    try {
      const cached = localStorage.getItem(key);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_EXPIRY.MENUS) {
          return data;
        }
      }
    } catch (err) {
      console.warn("Failed to parse cache:", err);
    }
    return null;
  }, []);

  const setCacheData = useCallback((key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify({
        data,
        timestamp: Date.now()
      }));
    } catch (err) {
      console.warn("Failed to set cache:", err);
    }
  }, []);

  // MANUAL TRIGGER: This is what you call on button click
  const fetchMenus = useCallback(async () => {
    if (menus.length > 0 || loading) return;

    try {
      setLoading(true);
      
      // 1. Check cache first
      const cachedMenus = getCachedData(CACHE_KEYS.MENUS);
      if (cachedMenus) {
        setMenus(cachedMenus);
        setLoading(false);
        return;
      }

      // 2. Fetch from API
      const res = await fetch(`${baseURL}/version2/init/menus`);
      
      if (!res.ok) throw new Error(`Failed: ${res.status}`);
      
      const json = await res.json();
      const menuData = json.data?.menus || []; // Using your data structure
      
      setMenus(menuData);
      setCacheData(CACHE_KEYS.MENUS, menuData);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [menus.length, loading, getCachedData, setCacheData]);

  return { 
    menus, 
    loading, 
    error, 
    fetchMenus, // Exporting this for the button click
    clearCache: () => localStorage.removeItem(CACHE_KEYS.MENUS)
  };
};

export default useMenus;