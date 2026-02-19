import { useEffect, useState, useCallback } from "react";
import { baseURL, CACHE_KEYS, CACHE_EXPIRY } from "../utils/constants";

const useFeaturedBrands = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBrands = useCallback(async () => {
    // 1. Check Cache
    const cached = localStorage.getItem(CACHE_KEYS.FEATURED_BRANDS);
    if (cached) {
      try {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_EXPIRY.FEATURED_BRANDS) {
          setBrands(data);
          setLoading(false);
          return;
        }
      } catch (e) {
        console.error("Featured brands cache error", e);
      }
    }

    // 2. Fetch from API
    setLoading(true);
    try {
      const res = await fetch(`${baseURL}/version3/featured-brands`);
      if (!res.ok) throw new Error(`Status: ${res.status}`);
      
      const result = await res.json();
      const data = result.featured_brands || [];
      
      setBrands(data);
      
      // 3. Save to Cache
      localStorage.setItem(CACHE_KEYS.FEATURED_BRANDS, JSON.stringify({
        data: data,
        timestamp: Date.now()
      }));
    } catch (err) {
      console.error("Fetch featured brands failed:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  return { brands, loading };
};

export default useFeaturedBrands;