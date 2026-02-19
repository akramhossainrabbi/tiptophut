import React from 'react';

const SliderSkeleton = () => {
  return (
    // Matching the same container and padding as the SliderComponent
    <div className="container container-lg py-3 py-lg-5">
      <div className="slider-main-wrapper rounded-4 skeleton-container overflow-hidden">
        <div className="skeleton-wave h-100 w-100"></div>
        
        {/* Optional: Matching the dots at the bottom */}
        <div className="slider-pagination d-flex justify-content-center gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="dot-indicator skeleton-dot"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SliderSkeleton;