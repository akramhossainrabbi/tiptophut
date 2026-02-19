import React, { memo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useSliders from '../../hooks/useSliders';
import SliderSkeleton from './SliderSkeleton';

const SliderComponent = memo(() => {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  
  const { 
    sliders, 
    loading, 
    error, 
    activeIndex, 
    nextSlide, 
    prevSlide, 
    goToSlide 
  } = useSliders();

  // Auto-play Logic
  useEffect(() => {
    if (loading || error || !sliders?.length || isPaused) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [sliders, loading, error, isPaused, nextSlide]);

  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const handleTouchMove = (e) => setTouchEnd(e.touches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) nextSlide();
    if (distance < -50) prevSlide();
    setTouchStart(null);
    setTouchEnd(null);
  };

  if (loading) return <SliderSkeleton />;

  if (error || !sliders?.length) {
    return (
      <div className="container container-lg py-4">
        <div className="slider-state-container d-flex flex-column align-items-center justify-content-center bg-light border rounded-4 shadow-sm">
          <i className={`ph ${error ? 'ph-warning text-danger' : 'ph-image text-muted'} display-4`}></i>
          <p className="mt-2 fw-medium">{error ? 'Failed to load sliders' : 'No sliders available'}</p>
        </div>
      </div>
    );
  }

  return (
    // 'container-lg' ensures it's fluid until 992px, then stays constrained
    <div className="container container-lg py-3 py-lg-5">
      <div 
        className="slider-main-wrapper position-relative overflow-hidden rounded-4 border border-gray-100"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div 
          className="slider-track d-flex h-100"
          style={{
            transform: `translateX(-${activeIndex * 100}%)`,
            transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {sliders.map((slider, index) => (
            <div key={slider.id} className="slider-item flex-shrink-0 w-100 h-100">
              <Link to={slider.url} className="d-block w-100 h-100">
                <img 
                  src={slider.image} 
                  alt={slider.title || "Promotional banner"}
                  className="slider-img img-fluid w-100 h-100 object-fit-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </Link>
            </div>
          ))}
        </div>

        {/* UI Elements */}
        {sliders.length > 1 && (
          <>
            <button className="nav-btn prev-btn d-none d-md-flex" onClick={prevSlide}>
              <i className="ph ph-caret-left"></i>
            </button>
            <button className="nav-btn next-btn d-none d-md-flex" onClick={nextSlide}>
              <i className="ph ph-caret-right"></i>
            </button>

            <div className="slider-pagination d-flex justify-content-center gap-2">
              {sliders.map((_, index) => (
                <button
                  key={index}
                  className={`dot-indicator ${index === activeIndex ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
});

export default SliderComponent;