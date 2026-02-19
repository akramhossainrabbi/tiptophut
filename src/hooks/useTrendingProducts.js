import { useEffect, useState, useCallback } from "react";
import { baseURL, CACHE_KEYS, CACHE_EXPIRY } from "../utils/constants";

const useTrendingProducts = () => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTrending = useCallback(async () => {
    // 1. Check Cache
    const cached = localStorage.getItem(CACHE_KEYS.TRENDING_PRODUCTS);
    if (cached) {
      try {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_EXPIRY.TRENDING_PRODUCTS) {
          setTrending(data);
          setLoading(false);
          return;
        }
      } catch (e) {
        console.error("Trending products cache error", e);
      }
    }

    // 2. Fetch from API
    setLoading(true);
    try {
      const res = await fetch(`${baseURL}/version3/trending-products`);
      if (!res.ok) throw new Error(`Status: ${res.status}`);
      
      const result = await res.json();
      const data = result.trending_products || [];
      
      setTrending(data);
      
      // 3. Save to Cache
      localStorage.setItem(CACHE_KEYS.TRENDING_PRODUCTS, JSON.stringify({
        data: data,
        timestamp: Date.now()
      }));
    } catch (err) {
      console.error("Fetch trending products failed:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTrending();
  }, [fetchTrending]);

  return { trending, loading };
};

export default useTrendingProducts;