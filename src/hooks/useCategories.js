import { useEffect, useState, useCallback } from "react";
import { baseURL, CACHE_KEYS, CACHE_EXPIRY } from "../utils/constants";

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = useCallback(async () => {
    if (categories.length > 0) {
        setLoading(false);
        return;
    }

    const cached = localStorage.getItem(CACHE_KEYS.CATEGORIES);
    if (cached) {
      try {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_EXPIRY.CATEGORIES) {
          setCategories(data);
          setLoading(false);
          return;
        }
      } catch (e) {
        console.error("Cache parsing failed", e);
      }
    }

    setLoading(true);
    try {
      const res = await fetch(`${baseURL}/version3/category-list`);
      const json = await res.json();
      
      // Changed: Filter by depth_level 1 to get the parents
      const processed = (json?.data || []).filter(cat => cat.depth_level === 1);
      
      setCategories(processed);
      localStorage.setItem(CACHE_KEYS.CATEGORIES, JSON.stringify({
        data: processed,
        timestamp: Date.now()
      }));
    } catch (err) {
      console.error("Category fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [categories.length]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return { categories, loading };
};

export default useCategories;