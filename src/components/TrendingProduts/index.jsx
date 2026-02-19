import React, { useState, useMemo } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import useTrendingProducts from '../../hooks/useTrendingProducts';
import { ProductCard, ProductSkeleton } from '../ProductCard';

const TrendingProducts = () => {
    const { trending, loading } = useTrendingProducts();
    const [activeTab, setActiveTab] = useState('all');

    // Combine all products for the "All" tab
    const allProducts = useMemo(() => {
        if (!trending) return [];
        return trending.flatMap(category => category.products || []);
    }, [trending]);

    // Filter products based on selected tab
    const displayProducts = useMemo(() => {
        if (activeTab === 'all') return allProducts;
        return trending.find(cat => cat.id === activeTab)?.products || [];
    }, [activeTab, allProducts, trending]);

    const settings = {
        dots: false,
        arrows: true,
        infinite: displayProducts.length > 6,
        speed: 1000,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        responsive: [
            { breakpoint: 1599, settings: { slidesToShow: 5 } },
            { breakpoint: 1399, settings: { slidesToShow: 3 } },
            { breakpoint: 1199, settings: { slidesToShow: 2 } },
            { breakpoint: 575, settings: { slidesToShow: 1 } },
        ],
    };

    return (
        <section className="trending-productss pt-80">
            <div className="container container-lg">
                <div className="border border-gray-100 p-24 rounded-16">
                    <div className="section-heading mb-24">
                        <div className="flex-between flex-wrap gap-8">
                            <h5 className="mb-0">Trending Products</h5>
                            
                            {/* Tabs aligned to the right */}
                            <ul className="nav common-tab style-two nav-pills ms-auto" role="tablist">
                                {loading ? (
                                    <div className="shimmer-base w-120 rounded-pill" style={{height: '35px'}}></div>
                                ) : (
                                    <>
                                        <li className="nav-item">
                                            <button
                                                className={`nav-link ${activeTab === 'all' ? 'active' : ''}`}
                                                onClick={() => setActiveTab('all')}
                                            >
                                                All
                                            </button>
                                        </li>
                                        {trending.map((category) => (
                                            <li key={category.id} className="nav-item">
                                                <button
                                                    className={`nav-link ${activeTab === category.id ? 'active' : ''}`}
                                                    onClick={() => setActiveTab(category.id)}
                                                >
                                                    {category.category_name}
                                                </button>
                                            </li>
                                        ))}
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>

                    <div className="deals-week-slider arrow-style-two">
                        {/* We use the activeTab in the key to force slider reset on tab change */}
                        <Slider {...settings} key={activeTab}>
                            {loading ? (
                                [...Array(6)].map((_, i) => (
                                    <div key={i} className="px-2">
                                        <ProductSkeleton />
                                    </div>
                                ))
                            ) : (
                                displayProducts.map((product) => (
                                    <div key={product.id} className="px-2">
                                        <ProductCard product={product} />
                                    </div>
                                ))
                            )}
                        </Slider>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrendingProducts;