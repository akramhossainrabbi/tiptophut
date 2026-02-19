import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { assetsURL } from '../../helper/helper';

const CartSection = () => {
    const { cartItems, summary, updateQuantity, removeFromCart, loading } = useCart();

    if (!loading && cartItems.length === 0) {
        return (
            <div className="py-80 text-center">
                <h4>Your cart is empty</h4>
                <Link to="/shop" className="btn btn-main mt-16">Continue Shopping</Link>
            </div>
        );
    }

    return (
        <section className="cart py-80">
            <div className="container container-lg">
                <div className="row gy-4">
                    <div className="col-xl-9 col-lg-8">
                        <div className="cart-table border border-gray-100 rounded-8 px-40 py-48">
                            <div className="overflow-x-auto">
                                <table className="table style-three">
                                    <thead>
                                        <tr>
                                            <th className="h6 mb-0 text-lg fw-bold">Delete</th>
                                            <th className="h6 mb-0 text-lg fw-bold">Product Name</th>
                                            <th className="h6 mb-0 text-lg fw-bold">Price</th>
                                            <th className="h6 mb-0 text-lg fw-bold">Quantity</th>
                                            <th className="h6 mb-0 text-lg fw-bold">Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item) => (
                                            <tr key={item.id}>
                                                <td>
                                                    <button 
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="remove-tr-btn transition-1 text-gray-400 hover-text-danger-600 border-0 bg-transparent"
                                                    >
                                                        <i className="ph ph-trash text-2xl" />
                                                    </button>
                                                </td>
                                                <td>
                                                    <div className="table-product d-flex align-items-center gap-24">
                                                        <Link to={`/product/${item.product?.slug}`} className="table-product__thumb border border-gray-100 rounded-8 flex-center">
                                                            <img src={ assetsURL + item.product?.thumb} alt={item.product?.name} />
                                                        </Link>
                                                        <div className="table-product__content">
                                                            <h6 className="title text-lg fw-semibold mb-8">
                                                                <Link to={`/product/${item.product?.slug}`} className="link text-line-2">{item.product?.name}</Link>
                                                            </h6>
                                                            <span className="text-gray-600 text-sm">Brand: {item.product?.brand_name}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="text-lg h6 mb-0 fw-semibold">৳{item.price}</span>
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center gap-12">
                                                        <div className="quantity-control border border-gray-100 rounded-pill p-4 d-flex align-items-center">
                                                            <button 
                                                                onClick={() => updateQuantity(item.id, item.qty - 1)}
                                                                className="quantity-control__button border-0 bg-transparent h-32 w-32 flex-center text-gray-400"
                                                            >
                                                                <i className="ph ph-minus" />
                                                            </button>
                                                            <input 
                                                                type="number" 
                                                                className="quantity-control__input border-0 text-center w-48 text-heading fw-semibold" 
                                                                value={item.qty} 
                                                                readOnly 
                                                            />
                                                            <button 
                                                                onClick={() => updateQuantity(item.id, item.qty + 1)}
                                                                className="quantity-control__button border-0 bg-transparent h-32 w-32 flex-center text-gray-400"
                                                            >
                                                                <i className="ph ph-plus" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="text-lg h6 mb-0 fw-semibold">৳{item.total_price}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Summary Sidebar */}
                    <div className="col-xl-3 col-lg-4">
                        <div className="cart-summary border border-gray-100 rounded-8 p-24">
                            <h6 className="mb-24">Cart Totals</h6>
                            <div className="d-flex flex-column gap-16">
                                <div className="flex-between gap-8">
                                    <span className="text-gray-900">Subtotal</span>
                                    <span className="text-gray-900 fw-semibold">৳{summary?.subtotal}</span>
                                </div>
                                <div className="flex-between gap-8">
                                    <span className="text-gray-900">Shipping</span>
                                    <span className="text-gray-900 fw-semibold">৳{summary?.shipping_cost}</span>
                                </div>
                                <div className="flex-between gap-8 border-top pt-16">
                                    <span className="text-gray-900 text-xl fw-semibold">Total</span>
                                    <span className="text-main-600 text-xl fw-bold">৳{summary?.grand_total}</span>
                                </div>
                            </div>
                            <Link to="/checkout" className="btn btn-main mt-40 py-18 w-100 rounded-8">
                                Proceed to checkout
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CartSection;