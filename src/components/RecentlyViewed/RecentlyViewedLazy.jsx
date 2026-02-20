import React from 'react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import RecentlyViewed from './index';

const RecentlyViewedLazy = () => {
  const { ref, hasBeenVisible } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px',
  });

  return (
    <div ref={ref}>
      {hasBeenVisible ? <RecentlyViewed /> : <div style={{ minHeight: '400px' }} />}
    </div>
  );
};

export default RecentlyViewedLazy;
