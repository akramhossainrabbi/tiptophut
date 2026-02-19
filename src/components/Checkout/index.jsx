import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../../context/CheckoutContext';
import { useAuth } from '../../context/AuthContext';

const Checkout = () => {
    const { data, existingAddress, loading, isSubmitting, processOrder, fetchCheckoutData } = useCheckout();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [selectedPayment, setSelectedPayment] = useState("payment1");

    const [form, setForm] = useState({
        first_name: "", last_name: "", email: "", phone: "", address: ""
    });

    // 1. Re-fetch data every time user enters the checkout page
    useEffect(() => {
        if (user) {
            fetchCheckoutData();
        } else if (!localStorage.getItem('token')) {
            navigate('/login');
        }
    }, [user, fetchCheckoutData, navigate]);

    // 2. Populate form when address is found
    useEffect(() => {
        if (existingAddress) {
            const nameParts = (existingAddress.name || "").split(" ");
            setForm({
                first_name: nameParts[0] || "",
                last_name: nameParts.slice(1).join(" ") || "",
                email: existingAddress.email || user?.email || "",
                phone: existingAddress.phone || "",
                address: existingAddress.address || ""
            });
        }
    }, [existingAddress, user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await processOrder(form);
        if (result.success) navigate('/');
    };

    // Only show full-page loading if we have no data at all
    if (loading && !data) {
        return <div className="py-80 text-center">Loading Checkout Details...</div>;
    }

    const summary = data?.summary || { subtotal: 0, shipping_cost: 0, grand_total: 0 };

    return (
        <section className="checkout py-80">
            <div className="container container-lg">
                <div className="row">
                    <div className="col-xl-9 col-lg-8">
                        <form onSubmit={handleSubmit} id="checkout-form" className="pe-xl-5">
                            <div className="row gy-3">
                                <div className="col-sm-6">
                                    <input type="text" className="common-input border-gray-100" placeholder="First Name" value={form.first_name} onChange={e => setForm({...form, first_name: e.target.value})} required />
                                </div>
                                <div className="col-sm-6">
                                    <input type="text" className="common-input border-gray-100" placeholder="Last Name" value={form.last_name} onChange={e => setForm({...form, last_name: e.target.value})} required />
                                </div>
                                <div className="col-12">
                                    <input type="text" className="common-input border-gray-100" placeholder="Full Address" value={form.address} onChange={e => setForm({...form, address: e.target.value})} required />
                                </div>
                                <div className="col-12">
                                    <input type="email" className="common-input border-gray-100" placeholder="Email Address" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
                                </div>
                                <div className="col-12">
                                    <input type="text" className="common-input border-gray-100" placeholder="Phone Number" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} required />
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="col-xl-3 col-lg-4">
                        <div className="checkout-sidebar border border-gray-100 rounded-8 p-24">
                            <h6 className="text-xl mb-24">Cart Totals</h6>
                            <div className="d-flex flex-column gap-16">
                                <div className="flex-between">
                                    <span className="text-gray-900">Subtotal</span>
                                    <span className="text-gray-900 fw-semibold">৳{summary.subtotal}</span>
                                </div>
                                <div className="flex-between">
                                    <span className="text-gray-900">Shipping</span>
                                    <span className="text-gray-900 fw-semibold">৳{summary.shipping_cost}</span>
                                </div>
                                <div className="flex-between border-top pt-16">
                                    <span className="text-gray-900 text-xl fw-bold">Total</span>
                                    <span className="text-main-600 text-xl fw-bold">৳{summary.grand_total}</span>
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                form="checkout-form" 
                                disabled={isSubmitting} 
                                className="btn btn-main mt-40 py-18 w-100 rounded-8"
                            >
                                {isSubmitting ? "Processing..." : "Place Order"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Checkout;