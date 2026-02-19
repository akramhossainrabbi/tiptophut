import { useEffect, useState, useCallback } from "react";
import { baseURL, CACHE_KEYS, CACHE_EXPIRY } from "../utils/constants";

const useRecommended = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecommended = useCallback(async () => {
    // 1. Check Cache
    const cached = localStorage.getItem(CACHE_KEYS.RECOMMENDED);
    if (cached) {
      try {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_EXPIRY.RECOMMENDED) {
          setProducts(data);
          setLoading(false);
          return;
        }
      } catch (e) {
        console.error("Recommended products cache error", e);
      }
    }

    // 2. Fetch from API
    setLoading(true);
    try {
      const res = await fetch(`${baseURL}/version3/recomanded-products`);
      if (!res.ok) throw new Error(`Status: ${res.status}`);
      
      const result = await res.json();
      // Note: Endpoint returns recomanded_products according to your response example
      const data = result.recomanded_products || [];
      
      setProducts(data);
      
      // 3. Save to Cache
      localStorage.setItem(CACHE_KEYS.RECOMMENDED, JSON.stringify({
        data: data,
        timestamp: Date.now()
      }));
    } catch (err) {
      console.error("Fetch recommended products failed:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecommended();
  }, [fetchRecommended]);

  return { products, loading };
};

export default useRecommended;