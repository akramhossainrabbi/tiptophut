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
                <div className="section-heading mb-24">
                    <div className="flex-between flex-wrap gap-8">
                        <h5 className="mb-0">Recently Viewed Products</h5>
                        <Link to="/section/recent" className="btn btn-outline-main rounded-pill px-20 py-8">
                            View All
                        </Link>
                    </div>
                </div>
                
                <div className="row g-12">
                    {loading ? (
                        [...Array(6)].map((_, i) => (
                            <div key={i} className="col-6 col-lg-4 col-xl-3 col-xxl-2">
                                <ProductSkeleton />
                            </div>
                        ))
                    ) : (
                        recent.map((product) => (
                            <div key={product.id} className="col-6 col-lg-4 col-xl-3 col-xxl-2">
                                <ProductCard product={product} />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default RecentlyViewed;