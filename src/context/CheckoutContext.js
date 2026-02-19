import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { baseURL, CACHE_KEYS } from "../utils/constants";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";
import { useCart } from "./CartContext";

const CheckoutContext = createContext(null);

export const CheckoutProvider = ({ children }) => {
    const { user } = useAuth();
    const [data, setData] = useState(null);
    const [existingAddress, setExistingAddress] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false); // New state for the button
    const { clearCartState } = useCart();

    const fetchCheckoutData = useCallback(async () => {
        const token = localStorage.getItem(CACHE_KEYS.TOKEN);
        if (!token) return;

        setLoading(true);
        try {
            const headers = { 
                "Authorization": `Bearer ${token}`, 
                "Accept": "application/json" 
            };

            // 1. Fetch Order Summary
            const checkoutRes = await fetch(`${baseURL}/version3/checkout`, { headers });
            const checkoutJson = await checkoutRes.json();
            if (checkoutRes.ok) setData(checkoutJson);

            // 2. Fetch Existing Address
            const addressRes = await fetch(`${baseURL}/profile/address-list`, { headers });
            const addressJson = await addressRes.json();
            if (addressRes.ok && addressJson.addresses?.length > 0) {
                setExistingAddress(addressJson.addresses[0]);
            }
        } catch (err) { 
            console.error("Fetch Error:", err); 
        } finally { 
            setLoading(false); 
        }
    }, []);

    // Initial fetch on login/app load
    useEffect(() => { 
        if (user) fetchCheckoutData(); 
    }, [user, fetchCheckoutData]);

    const processOrder = useCallback(async (formData) => {
        const token = localStorage.getItem(CACHE_KEYS.TOKEN);
        setIsSubmitting(true); // Start processing state
        try {
            const headers = { 
                "Authorization": `Bearer ${token}`, 
                "Accept": "application/json",
                "Content-Type": "application/json"
            };

            // Save Address
            const addressPayload = {
                name: `${formData.first_name} ${formData.last_name}`,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                city: 1, state: 1, country: 1, postal_code: "0000"
            };

            const addressUrl = existingAddress 
                ? `${baseURL}/profile/address-update/${existingAddress.id}` 
                : `${baseURL}/profile/address-store`;
            
            await fetch(addressUrl, {
                method: "POST",
                headers,
                body: JSON.stringify(addressPayload)
            });

            // Place Order
            const packages = data?.packages || [];
            const orderPayload = {
                customer_email: formData.email,
                customer_phone: formData.phone,
                customer_shipping_address: "required",
                customer_billing_address: "required",
                payment_method: 1, 
                payment_id: 0,
                grand_total: data?.summary?.grand_total,
                sub_total: data?.summary?.subtotal,
                discount_total: data?.summary?.discount,
                shipping_total: data?.summary?.shipping_cost,
                tax_total: 0,
                number_of_package: packages.length,
                number_of_item: data?.summary?.total_items,
                shipping_cost: packages.map(() => 0),
                delivery_date: packages.map(() => new Date().toISOString().split('T')[0]),
                shipping_method: packages.map(() => 1),
                packagewiseTax: packages.map(() => 0),
            };

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
    }, [data, existingAddress, clearCartState]);

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