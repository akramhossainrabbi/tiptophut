import { useEffect, useState, useCallback } from "react";
import { baseURL, CACHE_KEYS, CACHE_EXPIRY } from "../utils/constants";

const useRecentProducts = () => {
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecent = useCallback(async () => {
    // 1. Check Cache
    const cached = localStorage.getItem(CACHE_KEYS.RECENT_PRODUCTS);
    if (cached) {
      try {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_EXPIRY.RECENT_PRODUCTS) {
          setRecent(data);
          setLoading(false);
          return;
        }
      } catch (e) {
        console.error("Recent products cache error", e);
      }
    }

    // 2. Fetch from API
    setLoading(true);
    try {
      const res = await fetch(`${baseURL}/version3/recent-products`);
      if (!res.ok) throw new Error(`Status: ${res.status}`);
      
      const result = await res.json();
      const data = result.recent_products || [];
      
      setRecent(data);
      
      // 3. Save to Cache
      localStorage.setItem(CACHE_KEYS.RECENT_PRODUCTS, JSON.stringify({
        data: data,
        timestamp: Date.now()
      }));
    } catch (err) {
      console.error("Fetch recent products failed:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecent();
  }, [fetchRecent]);

  return { recent, loading };
};

export default useRecentProducts;