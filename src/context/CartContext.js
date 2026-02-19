import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { baseURL, CACHE_KEYS } from "../utils/constants";
import { getDeviceToken } from "../utils/deviceHelper";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { user } = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [summary, setSummary] = useState(null);
    const [cartCount, setCartCount] = useState(0);

    const fetchCartData = useCallback(async () => {
        try {
            const device_token = getDeviceToken();
            const query = user ? `device_token=${device_token}&user_id=${user.id}` : `device_token=${device_token}`;
            const res = await fetch(`${baseURL}/version3/cart?${query}`);
            const json = await res.json();
            if (json.message === "Success") {
                setCartItems(json.items || []);
                setSummary(json.summary);
                setCartCount(json.summary?.total_items || 0);
            }
        } catch (err) { console.error(err); }
    }, [user]);

    useEffect(() => { fetchCartData(); }, [fetchCartData]);

    const getHeaders = () => ({
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.getItem(CACHE_KEYS.TOKEN)}`
    });

    const addToCart = useCallback(async (product, quantity, price) => {
        // Optimistic Count Update
        setCartCount(prev => prev + quantity);
        try {
            const res = await fetch(`${baseURL}/cart`, {
                method: "POST",
                headers: getHeaders(),
                body: JSON.stringify({
                    product_id: product.id,
                    qty: quantity,
                    price: price,
                    product_type: "product",
                    seller_id: product.seller_id || 1,
                    device_token: getDeviceToken(),
                    ...(user && { user_id: user.id })
                })
            });
            const json = await res.json();
            if (res.ok) {
                toast.success("Added to cart successfully");
                fetchCartData();
                return { success: true };
            }
            throw new Error();
        } catch (err) {
            setCartCount(prev => prev - quantity); // Rollback
            toast.error("Failed to add to cart");
            return { success: false };
        }
    }, [user, fetchCartData]);

    const updateQuantity = useCallback(async (id, newQty) => {
        if (newQty < 1) return;
        
        const previousItems = [...cartItems];
        // OPTIMISTIC UI: Update list immediately
        setCartItems(prev => prev.map(item => 
            item.id === id ? { ...item, qty: newQty, total_price: item.price * newQty } : item
        ));

        try {
            const res = await fetch(`${baseURL}/cart/update-qty`, {
                method: "POST",
                headers: getHeaders(),
                body: JSON.stringify({ id, qty: newQty })
            });
            if (!res.ok) throw new Error();
            fetchCartData(); // Background sync
        } catch (err) {
            setCartItems(previousItems); // Rollback
            toast.error("Update failed");
        }
    }, [cartItems, fetchCartData]);

    const removeFromCart = useCallback(async (id) => {
        const previousItems = [...cartItems];
        setCartItems(prev => prev.filter(item => item.id !== id)); // Optimistic remove

        try {
            const res = await fetch(`${baseURL}/cart/remove`, {
                method: "POST",
                headers: getHeaders(),
                body: JSON.stringify({ id })
            });
            if (!res.ok) throw new Error();
            fetchCartData();
        } catch (err) {
            setCartItems(previousItems); // Rollback
            toast.error("Remove failed");
        }
    }, [cartItems, fetchCartData]);

    const clearCartState = () => {
        setCartItems([]);
        setCartCount(0);
        setSummary({
            subtotal: 0,
            shipping_cost: 0,
            discount: 0,
            grand_total: 0,
            total_items: 0
        });
    };

    return (
        <CartContext.Provider value={{ cartItems, summary, cartCount, addToCart, updateQuantity, removeFromCart, clearCartState }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);