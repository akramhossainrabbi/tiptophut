import React from 'react';
import { Link } from 'react-router-dom';
import useRecentProducts from '../../hooks/useRecentProducts';
import { ProductCard, ProductSkeleton } from '../ProductCard';

const RecentlyViewed = () => {
    const { recent, loading } = useRecentProducts();

    // If data is loaded and empty, don't show the section at all
    if (!loading && recent.length === 0) return null;

    return (
        <section className="recently-viewed pt-80">
            <div className="container container-lg">
                <div className="border border-gray-100 p-24 rounded-16">
                    <div className="section-heading mb-24">
                        <div className="flex-between flex-wrap gap-8">
                            <h5 className="mb-0">Recently Viewed Products</h5>
                            <div className="flex-align gap-16">
                                <Link
                                    to="/shop"
                                    className="text-sm fw-medium text-gray-700 hover-text-main-600 hover-text-decoration-underline"
                                >
                                    View All Products
                                </Link>
                            </div>
                        </div>
                    </div>
                    
                    <div className="row g-12">
                        {loading ? (
                            // Showing 6 skeletons by default
                            [...Array(6)].map((_, i) => (
                                <div key={i} className="col-xxl-2 col-xl-3 col-lg-4 col-sm-6">
                                    <ProductSkeleton />
                                </div>
                            ))
                        ) : (
                            recent.map((product) => (
                                <div key={product.id} className="col-xxl-2 col-xl-3 col-lg-4 col-sm-6">
                                    <ProductCard product={product} />
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RecentlyViewed;