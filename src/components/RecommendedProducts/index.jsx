import React, { useMemo } from 'react';
import Slider from 'react-slick';
import useRecommended from '../../hooks/useRecommended';
import { ProductCard, ProductSkeleton } from '../ProductCard';

const SampleNextArrow = ({ className, onClick }) => (
    <button
        type="button" 
        onClick={onClick}
        className={`${className} slick-next slick-arrow flex-center rounded-circle border border-gray-100 hover-border-neutral-600 text-xl hover-bg-neutral-600 hover-text-white transition-1`}
        style={{ zIndex: 2 }}
    >
        <i className="ph ph-caret-right" />
    </button>
);

const SamplePrevArrow = ({ className, onClick }) => (
    <button
        type="button"
        onClick={onClick}
        className={`${className} slick-prev slick-arrow flex-center rounded-circle border border-gray-100 hover-border-neutral-600 text-xl hover-bg-neutral-600 hover-text-white transition-1`}
        style={{ zIndex: 2 }}
    >
        <i className="ph ph-caret-left" />
    </button>
);

const RecommendedProducts = () => {
    const { products, loading } = useRecommended();

    const settings = useMemo(() => ({
        dots: false,
        arrows: true,
        infinite: products.length > 6,
        speed: 1000,
        slidesToShow: 6,
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
    }), [products.length]);

    return (
        <section className="recommended-products pt-80">
            <div className="container container-lg">
                <div className="border border-gray-100 p-24 rounded-16">
                    <div className="section-heading mb-24">
                        <div className="flex-between flex-wrap gap-8">
                            <h5 className="mb-0">Recommended For You</h5>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="recommended-slider arrow-style-two position-relative">
                                <Slider {...settings} key={loading ? 'loading' : 'loaded'}>
                                    {loading ? (
                                        [...Array(6)].map((_, i) => (
                                            <div key={i} className="px-2">
                                                <ProductSkeleton />
                                            </div>
                                        ))
                                    ) : (
                                        products.map((product) => (
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

export default RecommendedProducts;