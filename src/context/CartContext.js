import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { toast } from "react-toastify";

const CartContext = createContext();
const CART_STORAGE_KEY = "cart-items-v1";

const toNumber = (value) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
};

const buildSummary = (items) => {
    const subtotal = items.reduce((sum, item) => sum + toNumber(item.total_price), 0);
    const totalItems = items.reduce((sum, item) => sum + toNumber(item.qty), 0);
    return {
        subtotal,
        shipping_cost: 0,
        discount: 0,
        grand_total: subtotal,
        total_items: totalItems
    };
};

const mapProductToCartItem = (product, quantity, price) => ({
    id: product.id,
    product_id: product.id,
    qty: quantity,
    price: toNumber(price),
    total_price: toNumber(price) * quantity,
    seller_id: product.seller_id || 1,
    product: {
        id: product.id,
        slug: product.slug,
        name: product.product_name || product.name,
        thumb: product.thumbnail || product.thumb,
        brand_name: product.brand_name || product.brand?.name || ""
    }
});

const readCartFromStorage = () => {
    try {
        const raw = localStorage.getItem(CART_STORAGE_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
        return [];
    }
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => readCartFromStorage());
    const [summary, setSummary] = useState(() => buildSummary(readCartFromStorage()));
    const [cartCount, setCartCount] = useState(0);
    const [loading] = useState(false);

    useEffect(() => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
        const nextSummary = buildSummary(cartItems);
        setSummary(nextSummary);
        setCartCount(nextSummary.total_items);
    }, [cartItems]);

    const addToCart = useCallback(async (product, quantity, price) => {
        setCartItems((prev) => {
            const existingItem = prev.find((item) => item.product_id === product.id);
            if (existingItem) {
                return prev.map((item) =>
                    item.product_id === product.id
                        ? {
                            ...item,
                            qty: item.qty + quantity,
                            total_price: item.price * (item.qty + quantity)
                        }
                        : item
                );
            }
            return [...prev, mapProductToCartItem(product, quantity, price)];
        });
        toast.success("Added to cart successfully");
        return { success: true };
    }, []);

    const updateQuantity = useCallback((id, newQty) => {
        if (newQty < 1) {
            setCartItems((prev) => prev.filter((item) => item.id !== id));
            return;
        }

        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, qty: newQty, total_price: item.price * newQty }
                    : item
            )
        );
    }, []);

    const removeFromCart = useCallback((id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    }, []);

    const getCartItemQty = useCallback((productId) => {
        const item = cartItems.find((cartItem) => cartItem.product_id === productId);
        return item?.qty || 0;
    }, [cartItems]);

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
        <CartContext.Provider value={{ cartItems, summary, cartCount, loading, addToCart, updateQuantity, removeFromCart, getCartItemQty, clearCartState }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);