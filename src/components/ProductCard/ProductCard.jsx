import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { assetsURL } from '../../helper/helper';
import { useCart } from '../../context/CartContext';
import { getProductStatus } from '../../utils/productUtils';

const ProductCard = ({ product, isListView = false }) => {
    const { addToCart } = useCart();
    const [isAdding, setIsAdding] = useState(false);
    const { originalPrice, finalPrice, discountLabel, hasDiscount, isOutOfStock } = getProductStatus(product);

    const handleAdd = async (e) => {
        e.preventDefault();
        setIsAdding(true);
        await addToCart(product, 1, finalPrice);
        setIsAdding(false);
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
                    <button 
                        onClick={handleAdd} 
                        disabled={isAdding || isOutOfStock}
                        className="btn bg-main-50 text-main-600 hover-bg-main-600 hover-text-white py-11 px-24 rounded-8 w-100 flex-center gap-8 border-0"
                    >
                        {isAdding ? "..." : "Add To Cart"} <i className="ph ph-shopping-cart" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;