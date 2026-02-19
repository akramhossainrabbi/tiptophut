import { useEffect, useState, useCallback } from "react";
import { baseURL, CACHE_KEYS, CACHE_EXPIRY } from "../utils/constants";

const useTopSelling = () => {
  const [topSells, setTopSells] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTopSelling = useCallback(async () => {
    // 1. Check Cache
    const cached = localStorage.getItem(CACHE_KEYS.TOP_SELLING);
    if (cached) {
      try {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_EXPIRY.TOP_SELLING) {
          setTopSells(data);
          setLoading(false);
          return;
        }
      } catch (e) {
        console.error("Top selling cache error", e);
      }
    }

    // 2. Fetch from API
    setLoading(true);
    try {
      const res = await fetch(`${baseURL}/version3/top-selling`);
      if (!res.ok) throw new Error(`Status: ${res.status}`);
      
      const result = await res.json();
      const data = result.top_sells || [];
      
      setTopSells(data);
      
      // 3. Save to Cache
      localStorage.setItem(CACHE_KEYS.TOP_SELLING, JSON.stringify({
        data: data,
        timestamp: Date.now()
      }));
    } catch (err) {
      console.error("Fetch top selling failed:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTopSelling();
  }, [fetchTopSelling]);

  return { topSells, loading };
};

export default useTopSelling;