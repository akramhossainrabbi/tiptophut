import React from 'react';
import { Link } from 'react-router-dom';
import useTopSelling from '../../hooks/useTopSelling';
import { ProductCard, ProductSkeleton } from '../ProductCard';

const TopSelling = () => {
    const { topSells, loading } = useTopSelling();

    return (
        <section className="top-selling-products pt-80">
            <div className="container container-lg">
                <div className="section-heading mb-24">
                    <div className="flex-between flex-wrap gap-8">
                        <h5 className="mb-0">Top Selling Products</h5>
                        <Link to="/section/top-selling" className="btn btn-outline-main rounded-pill px-20 py-8">
                            View All
                        </Link>
                    </div>
                </div>

                <div className="row g-12">
                    {loading
                        ? [...Array(6)].map((_, i) => (
                              <div key={i} className="col-6 col-lg-4 col-xl-3 col-xxl-2">
                                  <ProductSkeleton />
                              </div>
                          ))
                        : topSells.map((product) => (
                              <div key={product.id} className="col-6 col-lg-4 col-xl-3 col-xxl-2">
                                  <ProductCard product={product} />
                              </div>
                          ))}
                </div>
            </div>
        </section>
    );
};

export default TopSelling;