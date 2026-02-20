const FlashDealBannerSkeleton = () => {
    return (
        <div className="banner-skeleton shimmer-base mb-24">
            {/* Left Text Area */}
            <div className="skeleton-content">
                <div className="skeleton-title"></div>
                <div className="skeleton-subtitle"></div>
            </div>

            {/* Top Right Countdown Area */}
            <div className="skeleton-countdown">
                <div className="skeleton-label"></div>
                <div className="skeleton-timer-row">
                    <div className="skeleton-box"></div>
                    <div className="skeleton-box"></div>
                    <div className="skeleton-box"></div>
                    <div className="skeleton-box"></div>
                </div>
            </div>
        </div>
    );
};

export default FlashDealBannerSkeleton;