import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { assetsURL } from '../../helper/helper';
import useFeaturedCategories from '../../hooks/useFeaturedCategories';
import './style.scss';

const SampleNextArrow = ({ onClick }) => (
    <button type="button" onClick={onClick} className="slick-next slick-arrow flex-center rounded-circle bg-white text-xl hover-bg-main-600 hover-text-white transition-1">
        <i className="ph ph-caret-right" />
    </button>
);

const SamplePrevArrow = ({ onClick }) => (
    <button type="button" onClick={onClick} className="slick-prev slick-arrow flex-center rounded-circle bg-white text-xl hover-bg-main-600 hover-text-white transition-1">
        <i className="ph ph-caret-left" />
    </button>
);

const FeaturedCategories = () => {
    const { featured, loading } = useFeaturedCategories();

    const settings = useMemo(() => ({
        dots: false,
        arrows: true,
        infinite: featured.length > 10,
        speed: 1000,
        slidesToShow: 10,
        slidesToScroll: 2,
        lazyLoad: 'progressive',
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            { breakpoint: 1699, settings: { slidesToShow: 9 } },
            { breakpoint: 1399, settings: { slidesToShow: 6 } },
            { breakpoint: 992, settings: { slidesToShow: 5 } },
            { breakpoint: 768, settings: { slidesToShow: 4 } },
            { breakpoint: 424, settings: { slidesToShow: 2 } },
        ],
    }), [featured.length]);

    return (
        <section className="feature py-10" id="featureSection">
            <div className="container container-lg">
                <div className="position-relative arrow-center">
                    <div className="feature-item-wrapper">
                        <Slider {...settings} key={loading ? 'loading' : 'ready'}>
                            {loading ? (
                                [...Array(10)].map((_, index) => (
                                    <div key={`skel-${index}`} className="feature-item text-center">
                                        <div className="feature-item__thumb rounded-circle shimmer-base" />
                                        <div className="feature-item__content mt-16 px-3">
                                            <div className="shimmer-base shimmer-text mx-auto" />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                featured.map((item) => (
                                    <div key={item.id || item.slug} className="feature-item text-center">
                                        <div className="feature-item__thumb rounded-circle">
                                            <Link to={`/category/${item.slug}`} className="w-100 h-100 flex-center">
                                                <img 
                                                    src={assetsURL + item.image} 
                                                    alt={item.name}
                                                    loading="lazy" // Native browser lazy loading
                                                />
                                            </Link>
                                        </div>
                                        <div className="feature-item__content mt-16">
                                            <h6 className="text-lg mb-8">
                                                <Link to={`/category/${item.slug}`} className="text-inherit">
                                                    {item.name}
                                                </Link>
                                            </h6>
                                        </div>
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

export default FeaturedCategories;