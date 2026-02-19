import { useEffect, useState, useCallback, useRef } from "react";
import { baseURL } from "../utils/constants";

const useShopPage = (type, slug) => {
    const [data, setData] = useState(null);
    const [products, setProducts] = useState([]); 
    const [meta, setMeta] = useState(null); 
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    
    const [priceRange, setPriceRange] = useState([0, 5000]);
    const [absoluteRange, setAbsoluteRange] = useState([0, 5000]);
    const [initialBrands, setInitialBrands] = useState([]);
    const [initialCategories, setInitialCategories] = useState({ list: [], title: "" });
    
    const [sortBy, setSortBy] = useState("latest");
    const [selectedBrands, setSelectedBrands] = useState([]);
    
    // This allows us to track if the user actually clicked "Filter" or changed Sort
    const [filterTick, setFilterTick] = useState(0);

    const isInitialized = useRef(false);

    // Reset when primary filters change
    useEffect(() => {
        setProducts([]);
        setPage(1);
        setHasMore(true);
    }, [type, slug, sortBy, selectedBrands, filterTick]);

    const fetchShopData = useCallback(async (pageNum) => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams({
                page: pageNum,
                sort: sortBy,
                min_price: priceRange[0],
                max_price: priceRange[1],
            });

            if (selectedBrands.length > 0) {
                queryParams.append("brands", selectedBrands.join(","));
            }

            const res = await fetch(`${baseURL}/version3/${type}/${slug}?${queryParams.toString()}`);
            if (!res.ok) throw new Error("Failed to fetch");
            const result = await res.json();
            
            // This meta update powers your ProductSkeleton calculation
            setMeta(result.meta);

            if (pageNum === 1) {
                setData(result);
                setProducts(result.products);
                
                if (!isInitialized.current) {
                    if (result.lowest_price !== undefined) {
                        const min = result.lowest_price;
                        const max = result.height_price;
                        setPriceRange([min, max]);
                        setAbsoluteRange([min, max]);
                    }
                    const brandData = result.brands;
                    setInitialBrands(brandData ? (Array.isArray(brandData) ? brandData : [brandData]) : []);
                    
                    const catData = result.categories;
                    setInitialCategories({
                        list: Array.isArray(catData) ? catData : (catData?.siblings || []),
                        title: Array.isArray(catData) ? "Related Categories" : (catData?.name || "Categories")
                    });
                    isInitialized.current = true;
                }
            } else {
                setProducts(prev => [...prev, ...result.products]);
            }
            setHasMore(result.meta.current_page < result.meta.last_page);
        } catch (err) {
            console.error("Shop Page Error:", err);
        } finally {
            setLoading(false);
        }
        // Removed priceRange from here to prevent fetching while sliding
    }, [type, slug, sortBy, selectedBrands, filterTick]); 

    useEffect(() => {
        fetchShopData(page);
    }, [page, fetchShopData]);

    useEffect(() => { 
        isInitialized.current = false; 
        if (type === "brand" && slug) {
            setSelectedBrands([slug]);
        } else {
            setSelectedBrands([]);
        }
    }, [slug, type]);

    return { 
        data, products, meta, loading, hasMore, setPage, 
        priceRange, setPriceRange, absoluteRange,
        initialBrands, initialCategories,
        sortBy, setSortBy,
        selectedBrands, setSelectedBrands,
        applyFilter: () => setFilterTick(prev => prev + 1) // Call this when clicking "Filter"
    };
};

export default useShopPage;