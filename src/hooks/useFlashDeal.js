import { useEffect, useState, useCallback } from "react";
import { baseURL, CACHE_KEYS, CACHE_EXPIRY } from "../utils/constants";

const useFlashDeal = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchFlashDeal = useCallback(async () => {
    // 1. Check Cache
    const cached = localStorage.getItem(CACHE_KEYS.FLASHDEAL);
    if (cached) {
      try {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_EXPIRY.FLASHDEAL) {
          setData(data);
          setLoading(false);
          return;
        }
      } catch (e) {
        console.error("Flash deal cache error", e);
      }
    }

    // 2. Fetch from API if no cache or expired
    setLoading(true);
    try {
      const res = await fetch(`${baseURL}/version3/flash-deal`);
      if (!res.ok) throw new Error(`Status: ${res.status}`);
      
      const result = await res.json();
      const flashData = result.flash_deal || null;
      
      setData(flashData);
      
      // 3. Save to Cache
      localStorage.setItem(CACHE_KEYS.FLASHDEAL, JSON.stringify({
        data: flashData,
        timestamp: Date.now()
      }));
    } catch (err) {
      console.error("Fetch flash deal failed:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFlashDeal();
  }, [fetchFlashDeal]);

  return { data, loading };
};

export default useFlashDeal;