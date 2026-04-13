import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import useFlashDeal from '../../hooks/useFlashDeal';
import { calculateTimeLeft } from '../../utils/countdown';
import { ProductCard, ProductSkeleton } from '../ProductCard';
import { assetsURL } from '../../helper/helper';
import FlashDealBannerSkeleton from './FlashDealBannerSkeleton';
import './style.scss';

const FlashDeal = () => {
    const { data, loading } = useFlashDeal();
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(data?.end_date));

    useEffect(() => {
        if (!data?.end_date) return;
        
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(data.end_date));
        }, 1000);

        return () => clearInterval(timer);
    }, [data?.end_date]);

    const products = useMemo(() => data?.products || [], [data?.products]);
    const isExpired = useMemo(() => {
        if (!data?.end_date) return false;
        return new Date(data.end_date) < new Date();
    }, [data?.end_date]);

    if (!loading && (!data || isExpired || products.length === 0)) {
        return null;
    }

    return (
        <section className="deals-weeek pt-80">
            <div className="container container-lg">
                <div className="section-heading mb-24 flex-between">
                    <h5 className="mb-0">Flash Deals</h5>
                    <Link to="/section/flash-deals" className="btn btn-outline-main rounded-pill px-20 py-8">
                        View All
                    </Link>
                </div>

                    {/* Banner Section with Dynamic Image */}
                    {loading ? (
                        <FlashDealBannerSkeleton />
                    ) : (
                        <div className="deal-week-box rounded-16 overflow-hidden position-relative z-1 mb-24 d-flex align-items-center" style={{ minHeight: '200px' }}>
                            {/* Dynamic Banner Image */}
                            <img
                                src={data?.banner_image ? (assetsURL + data.banner_image) : 'assets/images/bg/week-deal-bg.png'}
                                alt="Flash Deal Banner"
                                className="position-absolute inset-0 w-100 h-100 z-n1 object-fit-cover"
                            />
                            
                            {/* Overlay to ensure text readability */}
                            <div className="position-absolute inset-0 bg-dark opacity-25 z-n1"></div>

                            <div className="ps-32 py-40 z-2">
                                <h3 className="text-white mb-0">{data?.title || "Loading Deal..."}</h3>
                                <p className="text-white opacity-75 mt-2">Grab your favorites before time runs out!</p>
                            </div>

                            {/* Countdown Moved to Upper Right */}
                            <div className="position-absolute top-0 end-0 mt-20 me-20 z-2">
                                <div className="bg-white bg-opacity-90 p-12 rounded-12 shadow-sm border border-white">
                                    <p className="text-xs fw-bold text-uppercase text-main-600 mb-8 text-center">Ends In:</p>
                                    <ul className="d-flex align-items-center gap-8 list-unstyled mb-0">
                                        {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
                                            <li key={unit} className="text-center">
                                                <div className="bg-neutral-600 text-white rounded-8 fw-bold flex-center" style={{ width: '40px', height: '40px' }}>
                                                    {timeLeft[unit]}
                                                </div>
                                                <span className="text-xxs fw-medium text-gray-600 text-uppercase" style={{ fontSize: '10px' }}>
                                                    {unit.slice(0, 3)}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                <div className="row g-12">
                    {loading ? (
                        [...Array(6)].map((_, i) => (
                            <div key={i} className="col-6 col-lg-4 col-xl-3 col-xxl-2">
                                <ProductSkeleton />
                            </div>
                        ))
                    ) : (
                        products.map((product) => (
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

export default FlashDeal;