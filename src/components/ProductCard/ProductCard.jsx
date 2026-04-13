import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { assetsURL } from '../../helper/helper';
import { useCart } from '../../context/CartContext';
import { getProductStatus } from '../../utils/productUtils';

const ProductCard = ({ product, isListView = false }) => {
    const { addToCart, updateQuantity, getCartItemQty } = useCart();
    const [isAdding, setIsAdding] = useState(false);
    const { originalPrice, finalPrice, discountLabel, hasDiscount, isOutOfStock } = getProductStatus(product);
    const cartQty = getCartItemQty(product.id);

    const handleAdd = async (e) => {
        e.preventDefault();
        setIsAdding(true);
        await addToCart(product, 1, finalPrice);
        setIsAdding(false);
    };

    const handleQtyChange = (e, nextQty) => {
        e.preventDefault();
        updateQuantity(product.id, nextQty);
    };

    return (
        <div className={`product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2 bg-white d-flex ${isListView ? 'flex-row' : 'flex-column'}`}>
            
            {/* Thumbnail */}
            <Link to={`/product/${product.slug}`} className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative overflow-hidden">
                {isOutOfStock ? (
                    <span className="product-card__badge bg-danger-600 px-8 py-4 text-xs text-white position-absolute inset-inline-start-0 inset-block-start-0 z-1">
                        Out of Stock
                    </span>
                ) : hasDiscount && (
                    <span className="product-card__badge bg-main-600 px-8 py-4 text-xs text-white position-absolute inset-inline-start-0 inset-block-start-0 z-1">
                        {discountLabel}
                    </span>
                )}
                <img 
                    src={assetsURL + product.thumbnail} 
                    alt={product.product_name}
                />
            </Link>

            {/* Content */}
            <div className={`product-card__content flex-grow-1 d-flex flex-column ${isListView ? 'ms-24' : 'mt-16'}`}>
                <h6 className="title mb-4">
                    <Link to={`/product/${product.slug}`} className="link hover-text-main-600">
                        {product.product_name}
                    </Link>
                </h6>

                <div className="product-card__price mt-8 mb-16 d-flex align-items-center gap-8">
                    <span className="text-heading fw-bold">
                        ৳{finalPrice}
                    </span>
                    {hasDiscount && (
                        <span className="text-gray-400 text-xs fw-medium text-decoration-line-through">
                            ৳{originalPrice}
                        </span>
                    )}
                </div>

                {/* Button Action - This stays at the bottom */}
                <div className="mt-auto w-100">
                    {cartQty > 0 ? (
                        <div className="quantity-control border border-main-600 rounded-pill p-4 d-flex align-items-center justify-content-between bg-main-50">
                            <button
                                onClick={(e) => handleQtyChange(e, cartQty - 1)}
                                className="quantity-control__button border-0 bg-main-600 text-white h-32 w-32 flex-center rounded-circle"
                            >
                                <i className="ph ph-minus" />
                            </button>
                            <input
                                type="number"
                                className="quantity-control__input border-0 text-center w-48 text-heading fw-bold bg-transparent"
                                value={cartQty}
                                readOnly
                            />
                            <button
                                onClick={(e) => handleQtyChange(e, cartQty + 1)}
                                className="quantity-control__button border-0 bg-main-600 text-white h-32 w-32 flex-center rounded-circle"
                            >
                                <i className="ph ph-plus" />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleAdd}
                            disabled={isAdding || isOutOfStock}
                            className="btn bg-main-600 text-white py-11 px-24 rounded-pill w-100 flex-center gap-8 border-0 fw-semibold"
                        >
                            {isAdding ? "..." : "Add"} <i className="ph ph-plus-circle text-xl" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;