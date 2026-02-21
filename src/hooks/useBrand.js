import { useEffect, useState, useCallback, useRef } from "react";
import { baseURL } from "../utils/constants";

const useBrand = (slug) => {
    const [data, setData] = useState(null);
    const [products, setProducts] = useState([]); 
    const [meta, setMeta] = useState(null); 
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    
    // Brand-specific filters: category and price
    const [priceRange, setPriceRange] = useState([0, 0]);
    const [absoluteRange, setAbsoluteRange] = useState([0, 0]);
    const [initialBrands, setInitialBrands] = useState([]);
    const [initialCategories, setInitialCategories] = useState({ list: [], title: "" });
    const [currentBrand, setCurrentBrand] = useState(null);
    
    const [sortBy, setSortBy] = useState("latest");
    const [selectedCategories, setSelectedCategories] = useState([]);
    
    const [filterTick, setFilterTick] = useState(0);
    const isInitialized = useRef(false);

    // Reset when slug changes
    useEffect(() => {
        setProducts([]);
        setPage(1);
        setHasMore(true);
        setPriceRange([0, 0]);
        setAbsoluteRange([0, 0]);
        setSelectedCategories([]);
        setSortBy("latest");
        setCurrentBrand(null);
        isInitialized.current = false;
        setFilterTick(0);
    }, [slug]);

    // Reset on filter/sort changes
    useEffect(() => {
        setProducts([]);
        setPage(1);
        setHasMore(true);
    }, [sortBy, selectedCategories, filterTick]);

    const fetchShopData = useCallback(async (pageNum) => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams({
                page: pageNum,
                sort: sortBy,
                min_price: priceRange[0],
            });

            // Only add max_price if it's been set (not 0)
            if (priceRange[1] > 0) {
                queryParams.append("max_price", priceRange[1]);
            }

            if (selectedCategories.length > 0) {
                queryParams.append("categories", selectedCategories.join(","));
            }

            const res = await fetch(`${baseURL}/version3/brand/${slug}?${queryParams.toString()}`);
            if (!res.ok) throw new Error("Failed to fetch");
            const result = await res.json();
            
            setMeta(result.meta);

            if (pageNum === 1) {
                setData(result);
                setProducts(result.products);
                
                if (!isInitialized.current) {
                    if (result.lowest_price !== undefined && result.height_price !== undefined) {
                        const min = result.lowest_price;
                        const max = result.height_price;
                        setPriceRange([min, max]);
                        setAbsoluteRange([min, max]);
                    }
                    const catData = result.categories;
                    setInitialCategories({
                        list: Array.isArray(catData) ? catData : (catData?.siblings || []),
                        title: Array.isArray(catData) ? "Related Categories" : (catData?.name || "Categories")
                    });

                    // Store current brand info
                    if (result.brand) {
                        setCurrentBrand(result.brand);
                    }

                    isInitialized.current = true;
                }
            } else {
                setProducts(prev => [...prev, ...result.products]);
            }
            setHasMore(result.meta.current_page < result.meta.last_page);
        } catch (err) {
            console.error("Brand Page Error:", err);
        } finally {
            setLoading(false);
        }
    }, [slug, sortBy, selectedCategories, filterTick]); 

    useEffect(() => {
        if (slug) {
            fetchShopData(page);
        }
    }, [page, fetchShopData, slug]);

    return { 
        data, products, meta, loading, hasMore, setPage, 
        priceRange, setPriceRange, absoluteRange,
        initialBrands, initialCategories, currentBrand,
        sortBy, setSortBy,
        selectedCategories, setSelectedCategories,
        applyFilter: () => setFilterTick(prev => prev + 1)
    };
};

export default useBrand;
