import React from 'react';

const ProductSkeleton = () => {
    return (
        <div className="product-card h-100 p-16 border border-gray-100 rounded-16 bg-white d-flex flex-column" style={{ minHeight: '420px' }}>
            {/* Thumbnail Shimmer */}
            <div className="shimmer-base rounded-8" style={{ width: '100%', height: '180px' }}></div>
            
            <div className="product-card__content mt-16 flex-grow-1 d-flex flex-column">
                {/* Title Shimmer - Fixed height to match .text-line-2 (44px) */}
                <div className="mt-12 mb-8" style={{ height: '44px' }}>
                    <div className="shimmer-base mb-8" style={{ width: '220px', height: '16px' }}></div>
                    <div className="shimmer-base" style={{ width: '180px', height: '16px' }}></div>
                </div>

                {/* Price Shimmer */}
                <div className="my-20 d-flex align-items-center gap-8">
                    <div className="shimmer-base" style={{ width: '100px', height: '24px' }}></div>
                    <div className="shimmer-base" style={{ width: '100px', height: '24px' }}></div>
                </div>

                {/* Button Shimmer - Pushed to bottom with mt-auto */}
                <div className="mt-auto">
                    <div className="shimmer-base rounded-8" style={{ width: '220px', height: '24px' }}></div>
                </div>
            </div>
        </div>
    );
};

export default ProductSkeleton;