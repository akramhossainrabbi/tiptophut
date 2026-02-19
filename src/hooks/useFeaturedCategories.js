import { useEffect, useState, useCallback } from "react";
import { baseURL, CACHE_KEYS, CACHE_EXPIRY } from "../utils/constants";

const useFeaturedCategories = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeatured = useCallback(async () => {
    // 1. Check Cache
    const cached = localStorage.getItem(CACHE_KEYS.FEATURED_CATEGORIES);
    if (cached) {
      try {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_EXPIRY.CATEGORIES) {
          setFeatured(data);
          setLoading(false);
          return;
        }
      } catch (e) {
        console.error("Featured categories cache error", e);
      }
    }

    // 2. Fetch from API if no cache or expired
    setLoading(true);
    try {
      const res = await fetch(`${baseURL}/version3/featured-categories`);
      if (!res.ok) throw new Error(`Status: ${res.status}`);
      
      const result = await res.json();
      const data = result.data || [];
      
      setFeatured(data);
      
      // 3. Save to Cache
      localStorage.setItem(CACHE_KEYS.FEATURED_CATEGORIES, JSON.stringify({
        data: data,
        timestamp: Date.now()
      }));
    } catch (err) {
      console.error("Fetch featured categories failed:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeatured();
  }, [fetchFeatured]);

  return { featured, loading };
};

export default useFeaturedCategories;