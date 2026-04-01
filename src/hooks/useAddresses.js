import { useEffect, useState, useCallback } from "react";
import { baseURL, CACHE_KEYS, CACHE_EXPIRY } from "../utils/constants";
import { useAuth } from "../context/AuthContext";

const useAddresses = () => {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAddresses = useCallback(async () => {
    if (!user) {
      setAddresses([]);
      setLoading(false);
      return;
    }

    const cached = localStorage.getItem(CACHE_KEYS.ADDRESSES);
    if (cached) {
      try {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_EXPIRY.ADDRESSES) {
          setAddresses(data);
          setLoading(false);
          return;
        }
      } catch (e) {
        console.error("Cache parsing failed", e);
      }
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("auth_token");
      const res = await fetch(`${baseURL}/profile/address-list`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await res.json();
      if (!res.ok) throw json;

      const data = json.data || [];
      setAddresses(data);
      localStorage.setItem(
        CACHE_KEYS.ADDRESSES,
        JSON.stringify({
          data,
          timestamp: Date.now(),
        })
      );
    } catch (err) {
      console.error("Address fetch error:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  const invalidateCache = () => {
    localStorage.removeItem(CACHE_KEYS.ADDRESSES);
  };

  const createAddress = useCallback(
    async (data) => {
      try {
        const token = localStorage.getItem("auth_token");
        const res = await fetch(`${baseURL}/profile/address-store`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
        const json = await res.json();
        if (!res.ok) throw json;

        invalidateCache();
        await fetchAddresses();
        return { success: true, data: json.data };
      } catch (err) {
        console.error("Create address error:", err);
        return { success: false, error: err };
      }
    },
    [fetchAddresses]
  );

  const updateAddress = useCallback(
    async (id, data) => {
      try {
        const token = localStorage.getItem("auth_token");
        const res = await fetch(`${baseURL}/profile/address-update/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
        const json = await res.json();
        if (!res.ok) throw json;

        invalidateCache();
        await fetchAddresses();
        return { success: true, data: json.data };
      } catch (err) {
        console.error("Update address error:", err);
        return { success: false, error: err };
      }
    },
    [fetchAddresses]
  );

  const deleteAddress = useCallback(
    async (id) => {
      try {
        const token = localStorage.getItem("auth_token");
        const res = await fetch(`${baseURL}/profile/address-delete`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id }),
        });
        const json = await res.json();
        if (!res.ok) throw json;

        invalidateCache();
        await fetchAddresses();
        return { success: true, data: json.data };
      } catch (err) {
        console.error("Delete address error:", err);
        return { success: false, error: err };
      }
    },
    [fetchAddresses]
  );

  const setDefaultShippingAddress = useCallback(
    async (id) => {
      try {
        const token = localStorage.getItem("auth_token");
        const res = await fetch(`${baseURL}/profile/default-shipping-address`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id }),
        });
        const json = await res.json();
        if (!res.ok) throw json;

        invalidateCache();
        await fetchAddresses();
        return { success: true, data: json.data };
      } catch (err) {
        console.error("Set default shipping address error:", err);
        return { success: false, error: err };
      }
    },
    [fetchAddresses]
  );

  const setDefaultBillingAddress = useCallback(
    async (id) => {
      try {
        const token = localStorage.getItem("auth_token");
        const res = await fetch(`${baseURL}/profile/default-billing-address`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id }),
        });
        const json = await res.json();
        if (!res.ok) throw json;

        invalidateCache();
        await fetchAddresses();
        return { success: true, data: json.data };
      } catch (err) {
        console.error("Set default billing address error:", err);
        return { success: false, error: err };
      }
    },
    [fetchAddresses]
  );

  return {
    addresses,
    loading,
    error,
    setAddresses,
    createAddress,
    updateAddress,
    deleteAddress,
    setDefaultShippingAddress,
    setDefaultBillingAddress,
  };
};

export default useAddresses;
