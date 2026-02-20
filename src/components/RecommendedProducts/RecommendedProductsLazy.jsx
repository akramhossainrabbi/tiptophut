import React from 'react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import RecommendedProducts from './index';

const RecommendedProductsLazy = () => {
  const { ref, hasBeenVisible } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px',
  });

  return (
    <div ref={ref}>
      {hasBeenVisible ? <RecommendedProducts /> : <div style={{ minHeight: '400px' }} />}
    </div>
  );
};

export default RecommendedProductsLazy;
