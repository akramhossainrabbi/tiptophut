import React, { useState, useMemo } from 'react';
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

    return (
        <section className="trending-productss pt-80">
            <div className="container container-lg">
                <div className="section-heading mb-24">
                    <div className="flex-between flex-wrap gap-8">
                        <h5 className="mb-0">Trending Products</h5>
                        <Link to="/section/trending" className="btn btn-outline-main rounded-pill px-20 py-8">
                            View All
                        </Link>
                    </div>
                    <div className="mt-16">
                        <ul className="nav common-tab style-two nav-pills" role="tablist">
                            {loading ? (
                                <div className="shimmer-base w-120 rounded-pill" style={{ height: '35px' }} />
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

                <div className="row g-12">
                    {loading
                        ? [...Array(6)].map((_, i) => (
                            <div key={i} className="col-6 col-lg-4 col-xl-3 col-xxl-2">
                                <ProductSkeleton />
                            </div>
                        ))
                        : displayProducts.map((product) => (
                            <div key={product.id} className="col-6 col-lg-4 col-xl-3 col-xxl-2">
                                <ProductCard product={product} />
                            </div>
                        ))}
                </div>
            </div>
        </section>
    );
};

export default TrendingProducts;