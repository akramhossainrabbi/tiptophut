import React from 'react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import FlashDeal from './index';

const FlashDealLazy = () => {
  const { ref, hasBeenVisible } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px',
  });

  return (
    <div ref={ref}>
      {hasBeenVisible ? <FlashDeal /> : <div style={{ minHeight: '400px' }} />}
    </div>
  );
};

export default FlashDealLazy;
