import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const slides = [
    '/assets/images/slider-image/img_1.jpg',
    '/assets/images/slider-image/img_2.jpg',
    '/assets/images/slider-image/img_3.jpg',
    '/assets/images/slider-image/img_4.jpg',
    '/assets/images/slider-image/img_5.jpg',
    '/assets/images/slider-image/img_6.jpg',
    '/assets/images/slider-image/img_7.jpg',
];

export default function VideoSlider() {
    return (
        <>
            <div className="container">
                <Swiper
                    effect="coverflow"
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView="auto"
                    loop={true}
                    autoplay={{
                        delay: 1500,
                        disableOnInteraction: false,
                    }}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 2.5,
                    }}
                    modules={[EffectCoverflow, Autoplay]}
                    className="swiper_container"
                >
                    {slides.map((img, index) => (
                        <SwiperSlide key={index}>
                            <img src={img} alt="slide_image" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    )
}
