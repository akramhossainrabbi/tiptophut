import React from 'react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import TrendingProducts from './index';

const TrendingProductsLazy = () => {
  const { ref, hasBeenVisible } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px',
  });

  return (
    <div ref={ref}>
      {hasBeenVisible ? <TrendingProducts /> : <div style={{ minHeight: '400px' }} />}
    </div>
  );
};

export default TrendingProductsLazy;
