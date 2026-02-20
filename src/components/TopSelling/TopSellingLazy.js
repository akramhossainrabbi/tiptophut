import React from 'react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import TopSelling from './index';

const TopSellingLazy = () => {
  const { ref, hasBeenVisible } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px',
  });

  return (
    <div ref={ref}>
      {hasBeenVisible ? <TopSelling /> : <div style={{ minHeight: '400px' }} />}
    </div>
  );
};

export default TopSellingLazy;
