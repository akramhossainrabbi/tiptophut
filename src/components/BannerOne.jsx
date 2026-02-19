import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import { assetsURL, baseURL } from '../helper/helper';
import VideoSlider from './VideoSlider';
const BannerOne = () => {

    function SampleNextArrow(props) {
        const { className, onClick } = props;
        return (
            <button
                type="button" onClick={onClick}
                className={` ${className} slick-next slick-arrow flex-center rounded-circle bg-white text-xl hover-bg-main-600 hover-text-white transition-1`}
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
                className={`${className} slick-prev slick-arrow flex-center rounded-circle bg-white text-xl hover-bg-main-600 hover-text-white transition-1`}
            >
                <i className="ph ph-caret-left" />
            </button>
        );
    }
    const settings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,


    };
    const [slider, setSlider] = useState([]);
        useEffect(() => {
            const fetchData = async () => {
                const url = `${baseURL}/version3/sliders`;
    
                try {
                    const response = await fetch(url);
    
                    if (!response.ok) {
                        throw new Error(`Response status: ${response.status}`);
                    }
                    const result = await response.json();
                    const sliders = result.data;
                    setSlider(sliders); 
                } catch (error) {
                    console.error(error.message);
                }
            };
    
            fetchData();
        }, []);
    return (
        <div className="banner">
            <div className="container container-lg">
                <div className="banner-item rounded-24 overflow-hidden position-relative arrow-center">
                    <a
                        href="#featureSection"
                        className="scroll-down w-84 h-84 text-center flex-center bg-main-600 rounded-circle border border-5 text-white border-white position-absolute start-50 translate-middle-x bottom-0 hover-bg-main-800"
                    >
                        <span className="icon line-height-0">
                            <i className="ph ph-caret-double-down" />
                        </span>
                    </a>
                    <img
                        src="/assets/images/bg/banner-bg.png"
                        alt=""
                        className="banner-img position-absolute inset-block-start-0 inset-inline-start-0 w-100 h-100 z-n1 object-fit-cover rounded-24"
                    />
                    <div className="flex-align">


                    </div>
                    <div className="banner-slider">
                        <Slider {...settings}>
                            {slider && slider.map((item, index) => (
                                <div key={index} className="banner-slider__item">
                                    <div className="banner-slider__inner flex-between position-relative">
                                        <div className="banner-item__content">
                                            <h1 className="banner-item__title bounce">
                                                {item.name}
                                            </h1>
                                            <Link
                                                to={`${item?.data_type === 'url' ? item?.url : item?.data_type === 'product' ? `${baseURL}/product-details/${item?.product.slug}` : item?.data_type === 'category' ? `${baseURL}/version3/product/category/${item?.category?.slug}/with_products=${item?.category?.id}` : '#'}`}
                                                className="btn btn-main d-inline-flex align-items-center rounded-pill gap-8"
                                            >
                                                Explore Shop{" "}
                                                <span className="icon text-xl d-flex">
                                                    <i className="ph ph-shopping-cart-simple" />{" "}
                                                </span>
                                            </Link>
                                        </div>
                                        <div className="banner-item__thumb">
                                            <img src={assetsURL+'/'+item.slider_image} alt="" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default BannerOne