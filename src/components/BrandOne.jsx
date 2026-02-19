import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { assetsURL, baseURL } from '../helper/helper';

const BrandOne = () => {
    const [brand, setBrand] = useState([]);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await fetch(`${baseURL}/version3/featured-brands`);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setBrand(data.featured_brands);
            }
            catch (error) {
                console.error("Error fetching brands:", error);
                return [];
            }
        };
        fetchBrands();
    }, []);

    function SampleNextArrow(props) {
        const { className, onClick } = props;
        return (
            <button
                type="button" onClick={onClick}
                className={` ${className} slick-next slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-600 text-xl hover-bg-main-600 hover-text-white transition-1`}
            >
                <i className="ph ph-caret-right" />
            </button>
        );
    }
    function SamplePrevArrow(props) {
        const { className, onClick } = props;

        return (

            <button
                type="button"
                onClick={onClick}
                className={`${className} slick-prev slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-600 text-xl hover-bg-main-600 hover-text-white transition-1`}
            >
                <i className="ph ph-caret-left" />
            </button>
        );
    }
    const settings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 8,
        slidesToScroll: 1,
        initialSlide: 0,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1599,
                settings: {
                    slidesToShow: 7,
                },
            },
            {
                breakpoint: 1399,
                settings: {
                    slidesToShow: 6,
                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 5,
                },
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 424,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 359,
                settings: {
                    slidesToShow: 2,
                },
            },
        ],
    };
    return (
        <div className="brand py-80">
            <div className="container container-lg">
                <div className="brand-inner bg-color-one p-24 rounded-16">
                    <div className="section-heading">
                        <div className="flex-between flex-wrap gap-8">
                            <h5 className="mb-0">Shop by Brands</h5>
                            <div className="flex-align mr-point gap-16">
                                <Link
                                    to="/shop"
                                    className="text-sm fw-medium text-gray-700 hover-text-main-600 hover-text-decoration-underline"
                                >
                                    View All Deals
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="brand-slider arrow-style-two">
                        <Slider {...settings}>
                            {brand?.map((item, index) => (
                                <div key={index} className="brand-item">
                                    <img src={assetsURL + '/' + item.logo} alt={item.name} />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default BrandOne