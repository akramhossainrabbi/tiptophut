import React, { useState, useMemo, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactSlider from 'react-slider';
import useBrand from '../../hooks/useBrand';
import { ProductCard, ProductSkeleton } from '../ProductCard';
import '../ShopSection/style.scss';

const SidebarSkeleton = () => (
    <div className="sidebar-skeleton animate-pulse">
        {[...Array(2)].map((_, boxIdx) => (
            <div key={boxIdx} className="shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32">
                <div className="shimmer bg-gray-100 mb-24" style={{ height: '24px', width: '60%', borderRadius: '4px' }} />
                <div className="border-bottom border-gray-100 mb-24" />
                {[...Array(5)].map((_, lineIdx) => (
                    <div key={lineIdx} className="shimmer bg-gray-50 mb-20" style={{ height: '18px', width: '85%', borderRadius: '4px' }} />
                ))}
            </div>
        ))}
    </div>
);

const BrandShop = () => {
    const { slug } = useParams();

    const { 
        data, products, meta, loading, hasMore, setPage, 
        priceRange, setPriceRange, absoluteRange, 
        initialCategories,
        sortBy, setSortBy,
        selectedCategories, setSelectedCategories,
        applyFilter,
    } = useBrand(slug);
    
    const [isGrid, setIsGrid] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const skeletonCount = useMemo(() => {
        if (!loading) return 0;
        if (!meta) return 8; 
        
        const remaining = meta.total - products.length;
        const pageSize = meta.per_page || 20;
        
        return remaining > pageSize ? pageSize : (remaining > 0 ? remaining : 0);
    }, [meta, products.length, loading]);

    const observer = useRef();
    const lastProductElementRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) setPage(prev => prev + 1);
        }, { rootMargin: '400px' });
        if (node) observer.current.observe(node);
    }, [loading, hasMore, setPage]);

    const handleReset = () => {
        setPriceRange(absoluteRange);
        setSelectedCategories([]);
        applyFilter();
    };

    return (
        <section className="shop py-80">
            <div className={`side-overlay ${sidebarOpen ? "show" : ""}`} onClick={() => setSidebarOpen(false)} />

            <div className="container container-lg">
                <div className="row">
                    <div className="col-lg-3">
                        <aside className={`shop-sidebar ${sidebarOpen ? "active" : ""}`}>
                            <button onClick={() => setSidebarOpen(false)} className="shop-sidebar__close d-lg-none flex-center position-absolute top-0 end-0 m-16 border border-gray-100 rounded-circle w-40 h-40 bg-white">
                                <i className="ph ph-x" />
                            </button>

                            {(!data && loading) ? <SidebarSkeleton /> : (
                                <>
                                    {/* Categories Filter */}
                                    {initialCategories.list.length > 0 && (
                                        <div className="shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32">
                                            <h6 className="text-xl border-bottom border-gray-100 pb-24 mb-24">{initialCategories.title}</h6>
                                            <ul className="max-h-540 overflow-y-auto scroll-sm list-unstyled">
                                                {initialCategories.list.map(cat => (
                                                    <li key={cat.id} className="mb-24">
                                                        <div className="form-check common-check">
                                                            <input 
                                                                className="form-check-input" 
                                                                type="checkbox" 
                                                                id={`cat-${cat.id}`}
                                                                checked={selectedCategories.includes(cat.slug)} 
                                                                onChange={() => {
                                                                    setSelectedCategories(prev => 
                                                                        prev.includes(cat.slug) ? prev.filter(c => c !== cat.slug) : [...prev, cat.slug]
                                                                    );
                                                                    applyFilter();
                                                                }}
                                                            />
                                                            <label className="form-check-label" htmlFor={`cat-${cat.id}`}>{cat.name}</label>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Price Filter */}
                                    <div className="shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32">
                                        <div className="flex-between border-bottom border-gray-100 pb-24 mb-24">
                                            <h6 className="text-xl">Filter by Price</h6>
                                            <button onClick={handleReset} className="text-sm text-main-600 fw-bold border-0 bg-transparent">Reset</button>
                                        </div>
                                        <div className="custom--range">
                                            <div className="slider-wrapper" style={{ height: '60px', marginTop: '20px' }}>
                                                <ReactSlider
                                                    className="horizontal-slider"
                                                    thumbClassName="example-thumb"
                                                    trackClassName="example-track"
                                                    min={absoluteRange[0]}
                                                    max={absoluteRange[1]}
                                                    value={priceRange}
                                                    onChange={(val) => setPriceRange(val)}
                                                    renderThumb={(props, state) => {
                                                        const { key, ...restProps } = props;
                                                        return <div {...restProps} key={key} className="example-thumb">{state.valueNow}</div>
                                                    }}
                                                    pearling minDistance={10}
                                                />
                                            </div>
                                            <div className="flex-between flex-wrap-reverse gap-8 mt-16">
                                                <button 
                                                    type="button" 
                                                    className="btn btn-main h-40 flex-align px-24 rounded-8" 
                                                    onClick={() => {
                                                        applyFilter(); 
                                                        setSidebarOpen(false);
                                                    }}
                                                >
                                                    Apply Price Filter
                                                </button>
                                                <div className="text-gray-900 fw-medium">৳{priceRange[0]} - ৳{priceRange[1]}</div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </aside>
                    </div>

                    <div className="col-lg-9">
                        <div className="flex-between gap-16 flex-wrap mb-40">
                            <span className="text-gray-900 fw-medium">Showing {products.length} {meta && `of ${meta.total}`} products</span>
                            <div className="flex-align gap-16 flex-wrap">
                                <div className="list-grid-btns flex-align gap-12">
                                    <button onClick={() => setIsGrid(false)} className={`w-44 h-44 flex-center border rounded-6 ${!isGrid ? "bg-main-600 text-white border-main-600" : "border-gray-100 text-gray-400"}`}><i className="ph ph-list-dashes" /></button>
                                    <button onClick={() => setIsGrid(true)} className={`w-44 h-44 flex-center border rounded-6 ${isGrid ? "bg-main-600 text-white border-main-600" : "border-gray-100 text-gray-400"}`}><i className="ph ph-squares-four" /></button>
                                </div>
                                <select className="form-control common-input rounded-6 border-gray-100 w-auto cursor-pointer" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                                    <option value="latest">Latest</option>
                                    <option value="low_to_high">Price: Low to High</option>
                                    <option value="high_to_low">Price: High to Low</option>
                                </select>
                                <button onClick={() => setSidebarOpen(true)} className="d-lg-none w-44 h-44 flex-center border border-gray-100 rounded-6 bg-white"><i className="ph-bold ph-funnel" /></button>
                            </div>
                        </div>

                        <div className={`row g-12 ${!isGrid ? "list-view-mode" : ""}`}>
                            {products.map((product, index) => (
                                <div key={`${product.id}-${index}`} ref={products.length === index + 1 ? lastProductElementRef : null} className={isGrid ? "col-xxl-3 col-xl-4 col-sm-6" : "col-12"}>
                                    <ProductCard product={product} isListView={!isGrid} />
                                </div>
                            ))}
                            
                            {loading && skeletonCount > 0 && (
                                [...Array(skeletonCount)].map((_, i) => (
                                    <div key={`skeleton-${i}`} className={isGrid ? "col-xxl-3 col-xl-4 col-sm-6" : "col-12"}>
                                        <ProductSkeleton isListView={!isGrid} />
                                    </div>
                                ))
                            )}

                            {!loading && products.length === 0 && (
                                <div className="col-12 text-center py-60">
                                    <p className="text-gray-500">No products match your criteria.</p>
                                    <button onClick={handleReset} className="btn btn-main mt-16">Clear All Filters</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BrandShop;
