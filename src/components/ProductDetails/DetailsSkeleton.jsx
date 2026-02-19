import React from 'react';

const DetailsSkeleton = () => (
    <div className="container container-lg py-80 animate-pulse">
        <div className="row g-4">
            {/* Main Content Area (9 Columns) */}
            <div className="col-lg-9">
                <div className="row gy-4">
                    {/* Gallery Left (Matches col-xl-6) */}
                    <div className="col-xl-6">
                        <div className="shimmer rounded-16" style={{ height: '500px', width: '100%' }} />
                        <div className="d-flex gap-12 mt-24">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="shimmer rounded-8" style={{ width: '80px', height: '80px' }} />
                            ))}
                        </div>
                    </div>

                    {/* Content Right (Matches col-xl-6) */}
                    <div className="col-xl-6">
                        <div className="shimmer mb-12" style={{ height: '32px', width: '80%' }} /> {/* Title */}
                        <div className="shimmer mb-20" style={{ height: '20px', width: '40%' }} /> {/* SKU/Status */}
                        
                        <div className="mb-20"> {/* Short Description */}
                            <div className="shimmer mb-2" style={{ height: '14px', width: '100%' }} />
                            <div className="shimmer mb-2" style={{ height: '14px', width: '95%' }} />
                            <div className="shimmer mb-2" style={{ height: '14px', width: '70%' }} />
                        </div>

                        <div className="d-flex align-items-center gap-16 mb-24">
                            <div className="shimmer" style={{ height: '40px', width: '120px' }} /> {/* Price */}
                            <div className="shimmer rounded-pill" style={{ height: '40px', width: '160px' }} /> {/* WhatsApp Button */}
                        </div>

                        <div className="shimmer mb-24 rounded-12" style={{ height: '100px', width: '100%' }} /> {/* Flash Deal Box */}

                        <div className="d-flex gap-16">
                            <div className="shimmer rounded-8" style={{ height: '50px', width: '120px' }} /> {/* Qty Control */}
                            <div className="shimmer rounded-8" style={{ height: '50px', width: '200px' }} /> {/* Add to Cart */}
                        </div>
                    </div>
                </div>

                {/* Long Description Tab Shimmer */}
                <div className="row mt-80">
                    <div className="col-12">
                        <div className="shimmer mb-32" style={{ height: '40px', width: '150px' }} />
                        <div className="shimmer mb-2" style={{ height: '14px', width: '100%' }} />
                        <div className="shimmer mb-2" style={{ height: '14px', width: '100%' }} />
                        <div className="shimmer mb-2" style={{ height: '14px', width: '80%' }} />
                    </div>
                </div>
            </div>

            {/* Sidebar Area (3 Columns) */}
            <div className="col-lg-3">
                <div className="border border-gray-100 rounded-16 overflow-hidden">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="p-24 border-bottom border-gray-100 d-flex gap-24">
                            <div className="shimmer rounded-circle" style={{ width: '44px', height: '44px', flexShrink: 0 }} />
                            <div className="flex-grow-1">
                                <div className="shimmer mb-8" style={{ height: '14px', width: '60%' }} />
                                <div className="shimmer" style={{ height: '12px', width: '90%' }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

export default DetailsSkeleton;