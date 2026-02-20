import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for detecting when an element enters the viewport
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Intersection threshold (0-1). Default: 0.1
 * @param {string} options.rootMargin - Margin around root element. Default: '0px'
 * @returns {Object} { ref, isVisible, hasBeenVisible }
 */
export default function useIntersectionObserver(options = {}) {
  const { threshold = 0.1, rootMargin = '0px' } = options;
  
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setHasBeenVisible(true);
          // Optionally unobserve after first visibility to avoid repeated triggers
          // observer.unobserve(entry.target);
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, rootMargin]);

  return { ref, isVisible, hasBeenVisible };
}
