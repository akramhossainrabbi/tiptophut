import { useEffect, useState, useCallback } from "react";
import { baseURL, CACHE_KEYS, CACHE_EXPIRY } from "../utils/constants";

const useSliders = () => {
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const getCachedData = useCallback((key) => {
    try {
      const cached = localStorage.getItem(key);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_EXPIRY.SLIDERS) {
          return data;
        }
      }
    } catch (err) {
      console.warn("Failed to parse cache:", err);
    }
    return null;
  }, []);

  const setCacheData = useCallback((key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify({
        data,
        timestamp: Date.now()
      }));
    } catch (err) {
      console.warn("Failed to set cache:", err);
    }
  }, []);

  // Process slider data - only image and URL
  const processSliderData = useCallback((data) => {
    if (!data || !Array.isArray(data)) return [];
    
    return data
      .map(slider => {
        // Build URL based on data_type
        let url = '#';
        
        switch (slider.data_type) {
          case 'category':
            if (slider.category?.slug) {
              url = `/category/${slider.category.slug}`;
            }
            break;
            
          case 'brand':
            if (slider.brand?.slug) {
              url = `/brand/${slider.brand.slug}`;
            }
            break;
            
          case 'product':
            if (slider.product?.slug) {
              url = `/product/${slider.product.slug}`;
            }
            break;
            
          case 'tag':
            if (slider.tag?.name) {
              url = `/tag/${slider.tag.name}`;
            }
            break;
            
          default:
            break;
        }
        
        return {
          id: slider.id,
          image: slider.slider_image || slider.image || '',
          url: url,
          position: slider.position || 0,
        };
      })
      .filter(slider => slider.image) // Only sliders with images
      .sort((a, b) => a.position - b.position); // Sort by position
  }, []);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        setLoading(true);
        
        // Check cache first
        const cachedSliders = getCachedData(CACHE_KEYS.SLIDERS);
        if (cachedSliders) {
          setSliders(cachedSliders);
          setLoading(false);
          return;
        }

        // Fetch from API
        const res = await fetch(`${baseURL}/version3/sliders`, {
          headers: {
            'Accept': 'application/json',
          }
        });
        
        if (!res.ok) {
          // Handle 404 as empty array
          if (res.status === 404) {
            setSliders([]);
            setCacheData(CACHE_KEYS.SLIDERS, []);
            setError(null);
            setLoading(false);
            return;
          }
          throw new Error(`Failed to fetch sliders: ${res.status} ${res.statusText}`);
        }
        
        const json = await res.json();
        const sliderData = json.data || [];
        
        const processedSliders = processSliderData(sliderData);
        setSliders(processedSliders);
        
        // Cache the response
        setCacheData(CACHE_KEYS.SLIDERS, processedSliders);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Slider fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSliders();
  }, [getCachedData, setCacheData, processSliderData]);

  // Auto-rotate slides
  useEffect(() => {
    if (sliders.length <= 1) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => 
        prevIndex === sliders.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval);
  }, [sliders.length]);

  const nextSlide = useCallback(() => {
    setActiveIndex((prevIndex) => 
      prevIndex === sliders.length - 1 ? 0 : prevIndex + 1
    );
  }, [sliders.length]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? sliders.length - 1 : prevIndex - 1
    );
  }, [sliders.length]);

  const goToSlide = useCallback((index) => {
    if (index >= 0 && index < sliders.length) {
      setActiveIndex(index);
    }
  }, [sliders.length]);

  const refreshSliders = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${baseURL}/version3/sliders`, {
        headers: {
          'Accept': 'application/json',
        }
      });
      
      if (!res.ok) {
        if (res.status === 404) {
          setSliders([]);
          setCacheData(CACHE_KEYS.SLIDERS, []);
          setError(null);
          setLoading(false);
          return;
        }
        throw new Error(`Failed to refresh sliders: ${res.status}`);
      }
      
      const json = await res.json();
      const sliderData = json.data || [];
      
      const processedSliders = processSliderData(sliderData);
      setSliders(processedSliders);
      setCacheData(CACHE_KEYS.SLIDERS, processedSliders);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [setCacheData, processSliderData]);

  return { 
    sliders, 
    loading, 
    error,
    activeIndex,
    nextSlide,
    prevSlide,
    goToSlide,
    refreshSliders,
    clearCache: () => localStorage.removeItem(CACHE_KEYS.SLIDERS)
  };
};

export default useSliders;