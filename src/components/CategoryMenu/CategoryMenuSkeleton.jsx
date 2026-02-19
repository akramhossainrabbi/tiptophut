import React from 'react';

const CategoryMenuSkeleton = () => {
  const isMobile = window.innerWidth < 992;
  return (
    <div className="category-dropdown-box active shadow-lg bg-white">
      {isMobile && (
        <div className="mobile-header d-flex align-items-center justify-content-between p-3 border-bottom bg-white sticky-top">
          <div className="shimmer rounded" style={{ width: '249px', height: '67px' }} />
          <div className="shimmer rounded-circle close-button" />
        </div>
      )}
      <div className="d-flex h-100">
        <div className="border-end p-3" style={{ width: isMobile ? '100%' : '280px' }}>
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="d-flex align-items-center gap-3 padding-y-3 mb-4">
              <div className="shimmer rounded-circle" style={{ width: '20px', height: '20px' }} />
              <div className="shimmer rounded flex-grow-1" style={{ height: '18px' }} />
            </div>
          ))}
        </div>
        {!isMobile && (
          <div className="p-5 flex-grow-1">
            <div className="row g-5">
              {[1, 2, 3].map(i => (
                <div key={i} className="col-4">
                  <div className="shimmer mb-4 rounded" style={{ height: '22px', width: '60%' }} />
                  {[1, 2, 3].map(j => <div key={j} className="shimmer mb-2 rounded" style={{ height: '12px' }} />)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryMenuSkeleton;