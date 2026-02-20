import { useEffect, useState } from 'react';
import useIntersectionObserver from './useIntersectionObserver';

/**
 * Custom hook for lazy loading data based on scroll visibility
 * Defers API calls until the section is visible in the viewport
 * 
 * @param {Function} hookFn - Custom hook function that fetches data (e.g., useFlashDeal)
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Intersection threshold (0-1). Default: 0.1
 * @param {string} options.rootMargin - Margin around root element. Default: '50px'
 * @returns {Object} { ref, data, loading, error } from the hookFn
 */
export default function useIntersectionLazyLoad(hookFn, options = {}) {
  const { threshold = 0.1, rootMargin = '50px' } = options;
  
  const { ref, hasBeenVisible } = useIntersectionObserver({
    threshold,
    rootMargin,
  });

  // Store the hook data only after section becomes visible
  const [hookData, setHookData] = useState({
    data: null,
    loading: true,
    error: null,
  });

  const [hookInstanceData, setHookInstanceData] = useState(null);

  // Create the hook instance only when the section becomes visible
  useEffect(() => {
    if (hasBeenVisible && !hookInstanceData) {
      // Execute the hook function to get data, loading, error
      try {
        const data = hookFn();
        setHookInstanceData(data);
      } catch (err) {
        console.error('[v0] Error initializing lazy load hook:', err);
        setHookData({
          data: null,
          loading: false,
          error: err.message,
        });
      }
    }
  }, [hasBeenVisible, hookFn, hookInstanceData]);

  // Update hook data when hookInstanceData changes
  useEffect(() => {
    if (hookInstanceData) {
      setHookData({
        data: hookInstanceData.data,
        loading: hookInstanceData.loading,
        error: hookInstanceData.error,
      });
    }
  }, [hookInstanceData]);

  return {
    ref,
    ...hookData,
  };
}
