import React from 'react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import FeaturedBrands from './index';

const FeaturedBrandsLazy = () => {
  const { ref, hasBeenVisible } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px',
  });

  return (
    <div ref={ref}>
      {hasBeenVisible ? <FeaturedBrands /> : <div style={{ minHeight: '400px' }} />}
    </div>
  );
};

export default FeaturedBrandsLazy;
