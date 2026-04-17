import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { baseURL, CACHE_KEYS } from "../utils/constants";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";
import { useCart } from "./CartContext";
import { getDeviceToken } from "../utils/deviceHelper";

const CheckoutContext = createContext(null);

export const CheckoutProvider = ({ children }) => {
    const { user } = useAuth();
    const [data, setData] = useState(null);
    const [existingAddress, setExistingAddress] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false); // New state for the button
    const { cartItems, summary, clearCartState } = useCart();

    const buildPackagesFromCart = useCallback((items) => {
        const groupedPackages = items.reduce((acc, item) => {
            const sellerId = item.seller_id || 0;
            if (!acc[sellerId]) acc[sellerId] = { seller_id: sellerId, items: [] };
            acc[sellerId].items.push(item);
            return acc;
        }, {});
        return Object.values(groupedPackages);
    }, []);

    const fetchCheckoutData = useCallback(async () => {
        const token = localStorage.getItem(CACHE_KEYS.TOKEN);
        setData({
            packages: buildPackagesFromCart(cartItems || []),
            summary: summary || {}
        });
        setLoading(true);
        try {
            if (token && user) {
                const headers = {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json"
                };

                const addressRes = await fetch(`${baseURL}/profile/address-list`, { headers });
                const addressJson = await addressRes.json();
                if (addressRes.ok && addressJson.addresses?.length > 0) {
                    setExistingAddress(addressJson.addresses[0]);
                }
            } else {
                setExistingAddress(null);
            }
        } catch (err) { 
            console.error("Fetch Error:", err); 
        } finally { 
            setLoading(false); 
        }
    }, [user, cartItems, summary, buildPackagesFromCart]);

    // Initial fetch on login/app load
    useEffect(() => { 
        fetchCheckoutData(); 
    }, [user, fetchCheckoutData]);

    useEffect(() => {
        setData({
            packages: buildPackagesFromCart(cartItems || []),
            summary: summary || {}
        });
    }, [cartItems, summary, buildPackagesFromCart]);

    const syncBackendCartFromLocal = useCallback(async (token) => {
        const deviceToken = getDeviceToken();
        const authHeaders = token
            ? { Authorization: `Bearer ${token}` }
            : {};

        const syncRes = await fetch(`${baseURL}/cart/sync`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                ...authHeaders
            },
            body: JSON.stringify({
                device_token: deviceToken,
                user_id: token && user?.id ? user.id : null,
                items: (cartItems || []).map((item) => ({
                    product_id: item.product_id,
                    qty: item.qty,
                    price: item.price,
                    product_type: "product",
                    seller_id: item.seller_id || 1
                }))
            })
        });

        if (!syncRes.ok) {
            throw new Error("Unable to sync cart for order");
        }
    }, [cartItems, user]);

    const processOrder = useCallback(async (formData) => {
        const token = localStorage.getItem(CACHE_KEYS.TOKEN);
        setIsSubmitting(true); // Start processing state
        try {
            const headers = { 
                "Accept": "application/json",
                "Content-Type": "application/json"
            };
            if (token) {
                headers.Authorization = `Bearer ${token}`;
            }

            await syncBackendCartFromLocal(token);

            // Save Address
            const addressPayload = {
                name: `${formData.first_name} ${formData.last_name}`,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                city: 1, state: 1, country: 1, postal_code: "0000"
            };

            if (token && user) {
                const addressUrl = existingAddress
                    ? `${baseURL}/profile/address-update/${existingAddress.id}`
                    : `${baseURL}/profile/address-store`;

                await fetch(addressUrl, {
                    method: "POST",
                    headers,
                    body: JSON.stringify(addressPayload)
                });
            }

            // Place Order
            const packages = buildPackagesFromCart(cartItems || []);
            const checkoutSummary = summary || {};
            const orderPayload = {
                customer_email: formData.email,
                customer_phone: formData.phone,
                customer_shipping_address: formData.address,
                customer_billing_address: formData.address,
                payment_method: 1, 
                payment_id: 0,
                grand_total: checkoutSummary.grand_total || 0,
                sub_total: checkoutSummary.subtotal || 0,
                discount_total: checkoutSummary.discount || 0,
                shipping_total: checkoutSummary.shipping_cost || 0,
                tax_total: 0,
                number_of_package: packages.length,
                number_of_item: checkoutSummary.total_items || 0,
                shipping_cost: packages.map(() => 0),
                delivery_date: packages.map(() => new Date().toISOString().split('T')[0]),
                shipping_method: packages.map(() => 1),
                packagewiseTax: packages.map(() => 0),
                shipping_name: `${formData.first_name} ${formData.last_name}`,
                shipping_address: formData.address,
                billing_name: `${formData.first_name} ${formData.last_name}`,
                billing_address: formData.address,
            };
            if (!token || !user) {
                orderPayload.device_token = getDeviceToken();
            }

            const orderRes = await fetch(`${baseURL}/order-store`, {
                method: "POST",
                headers,
                body: JSON.stringify(orderPayload)
            });

            if (!orderRes.ok) throw new Error("Order failed");

            clearCartState();
            setData(null); // Reset checkout data
            toast.success("Order Placed Successfully!");
            return { success: true };
        } catch (err) {
            toast.error(err.message || "Checkout failed");
            return { success: false };
        } finally { 
            setIsSubmitting(false); // Reset processing state
        }
    }, [existingAddress, clearCartState, user, cartItems, summary, buildPackagesFromCart, syncBackendCartFromLocal]);

    return (
        <CheckoutContext.Provider value={{ 
            data, 
            existingAddress, 
            loading, 
            isSubmitting, 
            processOrder, 
            fetchCheckoutData 
        }}>
            {children}
        </CheckoutContext.Provider>
    );
};

export const useCheckout = () => useContext(CheckoutContext);