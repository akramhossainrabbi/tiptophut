import { useEffect, useState, useCallback, useRef } from "react";
import { baseURL } from "../utils/constants";

const useCategory = (slug) => {
    const [data, setData] = useState(null);
    const [products, setProducts] = useState([]); 
    const [meta, setMeta] = useState(null); 
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    
    // Category-specific filters: brand and price
    const [priceRange, setPriceRange] = useState([0, 0]);
    const [absoluteRange, setAbsoluteRange] = useState([0, 0]);
    const [initialBrands, setInitialBrands] = useState([]);
    const [initialCategories, setInitialCategories] = useState({ list: [], title: "" });
    const [parentCategory, setParentCategory] = useState(null);
    
    const [sortBy, setSortBy] = useState("latest");
    const [selectedBrands, setSelectedBrands] = useState([]);
    
    const [filterTick, setFilterTick] = useState(0);
    const isInitialized = useRef(false);
    const priceRangeRef = useRef([0, 0]);

    // Reset when slug changes
    useEffect(() => {
        setProducts([]);
        setPage(1);
        setHasMore(true);
        setPriceRange([0, 0]);
        priceRangeRef.current = [0, 0];
        setAbsoluteRange([0, 0]);
        setSelectedBrands([]);
        setSortBy("latest");
        setParentCategory(null);
        setInitialCategories({ list: [], title: "" });
        isInitialized.current = false;
        setFilterTick(prev => prev + 1);
    }, [slug]);

    // Reset on filter/sort changes
    useEffect(() => {
        setProducts([]);
        setPage(1);
        setHasMore(true);
    }, [sortBy, selectedBrands, filterTick]);

    const fetchShopData = useCallback(async (pageNum) => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams({
                page: pageNum,
                sort: sortBy,
                min_price: priceRangeRef.current[0],
            });

            // Only add max_price if it's been set (not 0)
            if (priceRangeRef.current[1] > 0) {
                queryParams.append("max_price", priceRangeRef.current[1]);
            }

            if (selectedBrands.length > 0) {
                queryParams.append("brands", selectedBrands.join(","));
            }

            const res = await fetch(`${baseURL}/version3/category/${slug}?${queryParams.toString()}`);
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
                        priceRangeRef.current = [min, max];
                        setAbsoluteRange([min, max]);
                    }
                    const brandData = result.brands;
                    setInitialBrands(brandData ? (Array.isArray(brandData) ? brandData : [brandData]) : []);
                    
                    const catData = result.categories;
                    setInitialCategories({
                        list: Array.isArray(catData) ? catData : (catData?.siblings || []),
                        title: Array.isArray(catData) ? "Related Categories" : (catData?.name || "Categories")
                    });

                    // Store parent category info if available
                    if (catData && !Array.isArray(catData) && catData.parent) {
                        setParentCategory(catData.parent);
                    }

                    isInitialized.current = true;
                }
            } else {
                setProducts(prev => [...prev, ...result.products]);
            }
            setHasMore(result.meta.current_page < result.meta.last_page);
        } catch (err) {
            console.error("Category Page Error:", err);
        } finally {
            setLoading(false);
        }
    }, [slug, sortBy, selectedBrands, filterTick]); 

    useEffect(() => {
        if (slug) {
            fetchShopData(page);
        }
    }, [page, fetchShopData, slug]);

    return { 
        data, products, meta, loading, hasMore, setPage, 
        priceRange, setPriceRange, absoluteRange,
        initialBrands, initialCategories, parentCategory,
        sortBy, setSortBy,
        selectedBrands, setSelectedBrands,
        applyFilter: () => {
            priceRangeRef.current = priceRange;
            setFilterTick(prev => prev + 1);
        }
    };
};

export default useCategory;
