import React, { useMemo } from 'react';
import Slider from 'react-slick';
import useTopSelling from '../../hooks/useTopSelling';
import { ProductCard, ProductSkeleton } from '../ProductCard';

const SampleNextArrow = (props) => {
    const { className, onClick } = props;
    return (
        <button
            type="button"
            onClick={onClick}
            className={`${className} slick-next slick-arrow flex-center rounded-circle border border-gray-100 hover-border-neutral-600 text-xl hover-bg-neutral-600 hover-text-white transition-1`}
            style={{ zIndex: 2 }}
        >
            <i className="ph ph-caret-right" />
        </button>
    );
};

const SamplePrevArrow = (props) => {
    const { className, onClick } = props;
    return (
        <button
            type="button"
            onClick={onClick}
            className={`${className} slick-prev slick-arrow flex-center rounded-circle border border-gray-100 hover-border-neutral-600 text-xl hover-bg-neutral-600 hover-text-white transition-1`}
            style={{ zIndex: 2 }}
        >
            <i className="ph ph-caret-left" />
        </button>
    );
};

const TopSelling = () => {
    const { topSells, loading } = useTopSelling();

    const settings = useMemo(() => ({
        dots: false,
        arrows: true,
        infinite: topSells.length > 6,
        speed: 1000,
        slidesToShow: 6, // Increased to 6 since we removed the side banner
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            { breakpoint: 1599, settings: { slidesToShow: 5 } },
            { breakpoint: 1399, settings: { slidesToShow: 4 } },
            { breakpoint: 1199, settings: { slidesToShow: 3 } },
            { breakpoint: 767, settings: { slidesToShow: 2 } },
            { breakpoint: 575, settings: { slidesToShow: 1 } },
        ],
    }), [topSells.length]);

    return (
        <section className="top-selling-products pt-80">
            <div className="container container-lg">
                <div className="border border-gray-100 p-24 rounded-16">
                    <div className="section-heading mb-24">
                        <div className="flex-between flex-wrap gap-8">
                            <h5 className="mb-0">Top Selling Products</h5>
                            {/* "View All" a-tag removed as requested */}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            {/* slider-container class added to help with arrow positioning */}
                            <div className="top-selling-product-slider arrow-style-two position-relative">
                                <Slider {...settings} key={loading ? 'loading' : 'top-selling'}>
                                    {loading ? (
                                        [...Array(6)].map((_, i) => (
                                            <div key={i} className="px-2">
                                                <ProductSkeleton />
                                            </div>
                                        ))
                                    ) : (
                                        topSells.map((product) => (
                                            <div key={product.id} className="px-2">
                                                <ProductCard product={product} />
                                            </div>
                                        ))
                                    )}
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TopSelling;