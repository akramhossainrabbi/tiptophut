import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { ProductCard } from '../ProductCard';
import { assetsURL } from '../../helper/helper';
import { getProductStatus } from '../../utils/productUtils';
import { useAppSettings } from '../../context/SettingsContext';
import { useMeta } from '../../hooks/useMeta';
import { productMetaTags } from '../../utils/metaService';
import { useCart } from '../../context/CartContext';

// Custom Slider Arrows
function SampleNextArrow({ className, onClick }) {
    return (
        <button type="button" onClick={onClick} className={`${className} slick-next slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-600 text-xl hover-bg-main-600 hover-text-white transition-1`}>
            <i className="ph ph-caret-right" />
        </button>
    );
}

function SamplePrevArrow({ className, onClick }) {
    return (
        <button type="button" onClick={onClick} className={`${className} slick-prev slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-600 text-xl hover-bg-main-600 hover-text-white transition-1`}>
            <i className="ph ph-caret-left" />
        </button>
    );
}

const ProductDetails = ({ product, timeLeft }) => {
    const { addToCart, loading: cartLoading } = useCart();
    const {generalSettings, loading, error} = useAppSettings();
    const { originalPrice, finalPrice, discountLabel, hasDiscount, isOutOfStock } = getProductStatus(product);
    
    const [quantity, setQuantity] = useState(1);
    const [mainImage, setMainImage] = useState(product?.thumbnail);

    // Set meta tags for product details page
    const helmetContent = useMeta(productMetaTags(product));
    useEffect(() => {
        setMainImage(product?.thumbnail);
    }, [product]);

    const handleQuantity = (type) => {
        if (type === 'plus') {
            if (!product.max_order_qty || quantity < product.max_order_qty) {
                setQuantity(prev => prev + 1);
            }
        } else {
            if (quantity > 1) setQuantity(prev => prev - 1);
        }
    };

    // WhatsApp Configuration
    const whatsappNumber = generalSettings?.phone || "+880 1711 223344";
    const whatsappMsg = `Hi, I want to order: ${product.name} (SKU: ${product.product_id}) - Quantity: ${quantity}`;
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;

    const settings = {
        dots: false,
        arrows: true,
        infinite: product?.related_products?.length > 6,
        speed: 1000,
        slidesToShow: 6,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            { breakpoint: 1599, settings: { slidesToShow: 5 } },
            { breakpoint: 1399, settings: { slidesToShow: 4 } },
            { breakpoint: 992, settings: { slidesToShow: 3 } },
            { breakpoint: 575, settings: { slidesToShow: 2 } },
            { breakpoint: 424, settings: { slidesToShow: 1 } },
        ],
    };

    // Improved logic to check if description is truly empty or just empty HTML tags
    const hasLongDescription = product.long_description && product.long_description.replace(/<[^>]*>?/gm, '').trim().length > 0;

    const handleAddClick = async () => {
        await addToCart(product, quantity, finalPrice);
    };

    return (
        <section className="product-details py-80">
            {helmetContent}
            <div className="container container-lg">
                <div className="row g-4">
                    <div className="col-lg-9">
                        <div className="row gy-4">
                            {/* Gallery Left */}
                            <div className="col-xl-6">
                                <div className="product-details__left">
                                    <div className="product-details__main-img border border-gray-100 rounded-16 overflow-hidden">
                                        <img src={assetsURL + mainImage} alt={product.name} className="w-100 h-100 object-fit-cover" />
                                    </div>
                                    <div className="product-details__gallery d-flex gap-12 mt-24">
                                        {product.gallery?.map((img, idx) => (
                                            <div 
                                                key={idx} 
                                                onClick={() => setMainImage(img)}
                                                className={`gallery-item rounded-8 border cursor-pointer overflow-hidden ${mainImage === img ? 'border-main-600' : 'border-gray-100'}`}
                                                style={{ width: '80px', height: '80px' }}
                                            >
                                                <img src={assetsURL + img} className="w-100 h-100 object-fit-cover" alt="gallery" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Content Right */}
                            <div className="col-xl-6">
                                <div className="product-details__content">
                                    <h5 className="mb-12">{product.name}</h5>
                                    <div className="flex-align flex-wrap gap-12 mb-20">
                                        <span className="text-gray-900 fw-medium">SKU: <span className="text-gray-600">{product.sku}</span></span>
                                        <span className="text-gray-200">|</span>
                                        <span className={`text-sm fw-medium ${isOutOfStock ? 'text-danger-600' : 'text-main-600'}`}>
                                            {isOutOfStock ? 'Out of Stock' : (product.is_unlimited ? 'In Stock' : 'Available Now')}
                                        </span>
                                    </div>
                                    
                                    {product.short_description && (
                                        <div className="description-text mb-20" dangerouslySetInnerHTML={{ __html: product.short_description }} />
                                    )}

                                    <div className="d-flex align-items-center gap-16 mb-24">
                                        <h3 className="text-main-600">৳{finalPrice}</h3>
                                        {hasDiscount && (
                                            <div className="d-flex align-items-center gap-8">
                                                <del className="text-gray-400 text-xl">৳{originalPrice}</del>
                                                <span className="badge bg-main-600 text-white">{discountLabel} OFF</span>
                                            </div>
                                        )}
                                        {/* Added WhatsApp Button here */}
                                        <a href={whatsappLink} target="_blank" rel="noreferrer" className="btn btn-main rounded-pill px-24 py-10 text-sm">
                                            Order on WhatsApp
                                        </a>
                                    </div>

                                    {product.has_deal && timeLeft && (
                                        <div className="mt-32 p-16 bg-main-50 rounded-12 border border-main-100 mb-24">
                                            <p className="text-main-600 fw-bold mb-8">Flash Deal Ends In:</p>
                                            <div className="d-flex gap-16">
                                                {Object.entries(timeLeft).map(([unit, value]) => (
                                                    <div key={unit} className="text-center">
                                                        <div className="text-xl fw-bold">{value}</div>
                                                        <div className="text-xs text-uppercase">{unit}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="d-flex align-items-center gap-16 flex-wrap">
                                        <div className="quantity-control d-flex align-items-center border border-gray-100 rounded-8">
                                            <button onClick={() => handleQuantity('minus')} className="p-12"><i className="ph ph-minus" /></button>
                                            <input type="number" value={quantity} readOnly className="border-0 text-center w-40" />
                                            <button onClick={() => handleQuantity('plus')} className="p-12"><i className="ph ph-plus" /></button>
                                        </div>
                                        <button 
                                            className="btn btn-main px-40 py-12 rounded-8 flex-align gap-8" 
                                            disabled={isOutOfStock || cartLoading}
                                            onClick={handleAddClick}
                                        >
                                            {cartLoading ? 'Adding...' : 'Add to Cart'} <i className="ph ph-shopping-cart" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Long Description - Checks for content length without HTML tags */}
                        {hasLongDescription && (
                            <div className="row mt-80">
                                <div className="col-12">
                                    <div className="product-details__tabs border-bottom border-gray-100 mb-32">
                                        <button className="btn border-bottom border-main-600 text-main-600 rounded-0 pb-12">Description</button>
                                    </div>
                                    <div className="description-text" dangerouslySetInnerHTML={{ __html: product.long_description }} />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="col-lg-3">
                        <div className="product-details__sidebar border border-gray-100 rounded-16 overflow-hidden">
                            {[
                                { icon: "ph-truck", title: "Fast Delivery", desc: "Lightning-fast shipping, guaranteed." },
                                { icon: "ph-arrow-u-up-left", title: "Free 90-day returns", desc: "Shop risk-free with easy returns." },
                                { icon: "ph-check-circle", title: "Pickup available", desc: "Usually ready in 24 hours" },
                                { icon: "ph-credit-card", title: "Payment", desc: "Online card, Google Pay, or COD." },
                                { icon: "ph-package", title: "Packaging", desc: "Eco-friendly and secure packaging." }
                            ].map((item, i) => (
                                <div key={i} className="p-24 bg-color-one d-flex align-items-start gap-24 border-bottom border-gray-100">
                                    <span className="w-44 h-44 bg-white text-main-600 rounded-circle flex-center text-2xl flex-shrink-0">
                                        <i className={`ph-fill ${item.icon}`} />
                                    </span>
                                    <div>
                                        <h6 className="text-sm mb-8">{item.title}</h6>
                                        <p className="text-gray-700">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Products Section */}
            {product.related_products && product.related_products.length > 0 && (
                <div className="new-arrival pt-80">
                    <div className="container container-lg">
                        <div className="section-heading mb-32 flex-between">
                            <h5 className="mb-0">You Might Also Like</h5>
                            <Link to="/shop" className="text-sm fw-medium text-gray-700 hover-text-main-600 hover-text-decoration-underline">
                                All Products
                            </Link>
                        </div>
                        <div className="new-arrival__slider arrow-style-two">
                            <Slider {...settings}>
                                {product.related_products.map((item) => (
                                    <div key={item.id} className="px-2">
                                        <ProductCard product={item} />
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ProductDetails;