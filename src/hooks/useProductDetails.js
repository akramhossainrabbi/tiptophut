import { useState, useEffect, useCallback } from 'react';
import { baseURL } from '../utils/constants';
import { calculateTimeLeft } from '../utils/countdown';

const useProductDetails = (slug) => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState(null);

    const fetchProduct = useCallback(async () => {
        setLoading(true);
        try {
            // Updated to version 3 as per your logic
            const response = await fetch(`${baseURL}/version3/product/${slug}`);
            const result = await response.json();
            const productData = result.data;
            
            setProduct(productData);

            if (productData?.has_deal && productData?.flash_deal?.end_date) {
                setTimeLeft(calculateTimeLeft(productData.flash_deal.end_date));
            }
        } catch (error) {
            console.error("Error fetching product:", error);
        } finally {
            setLoading(false);
        }
    }, [slug]);

    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]);

    // Countdown Timer Effect
    useEffect(() => {
        if (!product?.has_deal || !product?.flash_deal?.end_date) return;

        const interval = setInterval(() => {
            const remaining = calculateTimeLeft(product.flash_deal.end_date);
            setTimeLeft(remaining);
        }, 1000);

        return () => clearInterval(interval);
    }, [product]);

    return { product, loading, timeLeft };
};

export default useProductDetails;