const SidebarSkeleton = () => {
    return (
        <div className="sidebar-skeleton animate-pulse">
            {/* Category Box Skeleton */}
            <div className="shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32">
                <div className="shimmer bg-gray-100 mb-24" style={{ height: '28px', width: '60%', borderRadius: '4px' }}></div>
                <div className="border-bottom border-gray-100 mb-24"></div>
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="shimmer bg-gray-50 mb-20" style={{ height: '20px', width: '80%', borderRadius: '4px' }}></div>
                ))}
            </div>

            {/* Price Filter Skeleton */}
            <div className="shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32">
                <div className="shimmer bg-gray-100 mb-24" style={{ height: '28px', width: '50%', borderRadius: '4px' }}></div>
                <div className="border-bottom border-gray-100 mb-24"></div>
                <div className="shimmer bg-gray-100 my-40" style={{ height: '8px', width: '100%', borderRadius: '10px' }}></div>
                <div className="flex-between mt-16">
                    <div className="shimmer bg-gray-200" style={{ height: '40px', width: '80px', borderRadius: '8px' }}></div>
                    <div className="shimmer bg-gray-100" style={{ height: '20px', width: '100px', borderRadius: '4px' }}></div>
                </div>
            </div>

            {/* Brand Box Skeleton */}
            <div className="shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32">
                <div className="shimmer bg-gray-100 mb-24" style={{ height: '28px', width: '55%', borderRadius: '4px' }}></div>
                <div className="border-bottom border-gray-100 mb-24"></div>
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex-align gap-12 mb-20">
                        <div className="shimmer bg-gray-100" style={{ height: '18px', width: '18px', borderRadius: '50%' }}></div>
                        <div className="shimmer bg-gray-50" style={{ height: '18px', width: '60%', borderRadius: '4px' }}></div>
                    </div>
                ))}
            </div>
        </div>
    );
};