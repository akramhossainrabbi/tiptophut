import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { baseURL, CACHE_KEYS, CACHE_EXPIRY } from '../utils/constants';

export const useOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
  });

  const getCacheKey = (page, status) => {
    return `${CACHE_KEYS.ORDERS}-page${page}-${status || 'all'}`;
  };

  const isCacheValid = (cacheKey) => {
    const cached = localStorage.getItem(cacheKey);
    if (!cached) return false;
    
    const { timestamp } = JSON.parse(cached);
    return Date.now() - timestamp < CACHE_EXPIRY.ORDERS;
  };

  const fetchOrders = useCallback(
    async (page = 1, status = null) => {
      if (!user) {
        setError('User not authenticated');
        return;
      }

      const cacheKey = getCacheKey(page, status);
      
      // Check cache
      if (isCacheValid(cacheKey)) {
        const cached = JSON.parse(localStorage.getItem(cacheKey));
        setOrders(cached.orders);
        setPagination(cached.pagination);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem(CACHE_KEYS.TOKEN);
        let url = `${baseURL}/version3/order-list?page=${page}`;
        
        if (status) {
          url += `&status=${status}`;
        }

        const res = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });

        const json = await res.json();
        if (!res.ok) throw json;

        const { orders: fetchedOrders, pagination: paginationData } = json;
        
        setOrders(fetchedOrders || []);
        setPagination(paginationData || { current_page: 1, last_page: 1, total: 0 });

        // Cache the result
        localStorage.setItem(
          cacheKey,
          JSON.stringify({
            orders: fetchedOrders || [],
            pagination: paginationData,
            timestamp: Date.now(),
          })
        );
      } catch (err) {
        console.error('[v0] Order list fetch error:', err);
        setError(err?.message || 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    },
    [user, baseURL]
  );

  // Auto-fetch orders on component mount if user is authenticated
  useEffect(() => {
    if (user) {
      fetchOrders(1);
    }
  }, [user, fetchOrders]);

  return {
    orders,
    loading,
    error,
    pagination,
    fetchOrders,
    setOrders,
  };
};

export default useOrders;
