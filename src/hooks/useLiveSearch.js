import { useState, useEffect, useCallback } from 'react';
import { baseURL } from '../utils/constants';

const useLiveSearch = (query, categoryId = 0) => {
    const [results, setResults] = useState({ brands: [], products: [] });
    const [loading, setLoading] = useState(false);

    const search = useCallback(async (searchQuery, catId) => {
        if (!searchQuery || searchQuery.trim().length < 2) {
            setResults({ brands: [], products: [] });
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`${baseURL}/version3/live-search`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    cat_id: catId === 'all' ? 0 : catId,
                    keyword: searchQuery
                })
            });
            
            const data = await res.json();
            setResults({
                brands: data.brands || [],
                products: data.products || []
            });
        } catch (error) {
            console.error("Live Search Error:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            search(query, categoryId);
        }, 400);
        return () => clearTimeout(timer);
    }, [query, categoryId, search]);

    // Export search so we can trigger it manually on submit
    return { results, loading, triggerSearch: search };
};

export default useLiveSearch;