import React, { useMemo } from 'react';
import Slider from 'react-slick';
import useFeaturedBrands from '../../hooks/useFeaturedBrands';
import { assetsURL } from '../../helper/helper';
import { Link } from 'react-router-dom';

const SampleNextArrow = ({ className, onClick }) => (
    <button
        type="button" onClick={onClick}
        className={`${className} slick-next slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-two-600 text-xl hover-bg-main-two-600 hover-text-white transition-1`}
        style={{ zIndex: 2 }}
    >
        <i className="ph ph-caret-right" />
    </button>
);

const SamplePrevArrow = ({ className, onClick }) => (
    <button
        type="button" onClick={onClick}
        className={`${className} slick-prev slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-two-600 text-xl hover-bg-main-two-600 hover-text-white transition-1`}
        style={{ zIndex: 2 }}
    >
        <i className="ph ph-caret-left" />
    </button>
);

const FeaturedBrands = () => {
    const { brands, loading } = useFeaturedBrands();

    const settings = useMemo(() => ({
        dots: false,
        arrows: true,
        infinite: brands.length > 8,
        speed: 1000,
        slidesToShow: 8,
        slidesToScroll: 1,
        autoplay: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            { breakpoint: 1599, settings: { slidesToShow: 7 } },
            { breakpoint: 1399, settings: { slidesToShow: 6 } },
            { breakpoint: 992, settings: { slidesToShow: 5 } },
            { breakpoint: 575, settings: { slidesToShow: 4 } },
            { breakpoint: 424, settings: { slidesToShow: 3 } },
            { breakpoint: 359, settings: { slidesToShow: 2 } },
        ],
    }), [brands.length]);

    return (
        <div className="top-brand py-80">
            <div className="container container-lg">
                <div className="border border-gray-100 p-24 rounded-16">
                    <div className="section-heading mb-24">
                        <div className="flex-between mr-point flex-wrap gap-8">
                            <h5 className="mb-0">Top Brands</h5>
                        </div>
                    </div>
                    
                    <div className="top-brand__slider">
                        <Slider {...settings} key={loading ? 'loading' : 'brands'}>
                            {loading ? (
                                [...Array(8)].map((_, i) => (
                                    <div key={i} className="px-8">
                                        <div className="shimmer-base rounded-8 border border-gray-100" style={{ height: '80px', width: '100%' }}></div>
                                    </div>
                                ))
                            ) : (
                                brands.map((brand) => (
                                    <div key={brand.id}>
                                        <div className="top-brand__item flex-center rounded-8 border border-gray-100 hover-border-main-600 transition-1 px-8">
                                            <Link to={`/brand/${brand.slug}`} className="w-100 h-100 flex-center">
                                                <img 
                                                    src={brand.logo ? assetsURL + brand.logo : 'assets/images/thumbs/placeholder-brand.png'} 
                                                    alt={brand.name} 
                                                    style={{ maxWidth: '100%', height: 'auto', maxHeight: '60px' }}
                                                />
                                            </Link>
                                        </div>
                                    </div>
                                ))
                            )}
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturedBrands;