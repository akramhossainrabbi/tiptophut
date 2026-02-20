import React, { useState, useMemo, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactSlider from 'react-slider';
import useShopPage from '../../hooks/useShopPage';
import { ProductCard, ProductSkeleton } from '../ProductCard';
import './style.scss';

const SidebarSkeleton = () => (
    <div className="sidebar-skeleton animate-pulse">
        {[...Array(3)].map((_, boxIdx) => (
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

const ShopSection = ({ type = "category", filters = [], hook = useShopPage }) => {
    const { slug } = useParams();

    const hookResult = hook(slug);
    
    const { 
        data, products, meta, loading, hasMore, setPage, 
        priceRange, setPriceRange, absoluteRange, 
        initialBrands, initialCategories,
        sortBy, setSortBy,
        applyFilter,
        parentCategory,
        currentBrand
    } = hookResult;
    
    // Determine which brand/category setter to use based on type
    let selectedBrands = hookResult.selectedBrands || [];
    let setSelectedBrands = hookResult.setSelectedBrands || (() => {});
    
    if (type === "brand") {
        selectedBrands = hookResult.selectedCategories || [];
        setSelectedBrands = hookResult.setSelectedCategories || (() => {});
    }
    
    if (type === "tag") {
        selectedBrands = hookResult.selectedBrands || [];
        setSelectedBrands = hookResult.setSelectedBrands || (() => {});
        // Also handle categories for tag page
        var selectedCategories = hookResult.selectedCategories || [];
        var setSelectedCategories = hookResult.setSelectedCategories || (() => {});
    }
    
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
        setSelectedBrands([]);
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
                                    {/* Categories - Only show if "category" is in filters array */}
                                    {filters.includes("category") && type === "category" && (
                                        <div className="shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32">
                                            <h6 className="text-xl border-bottom border-gray-100 pb-24 mb-24">Categories</h6>
                                            <ul className="max-h-540 overflow-y-auto scroll-sm list-unstyled">
                                                {/* Show parent category if available */}
                                                {parentCategory && (
                                                    <li className="mb-24">
                                                        <Link to={`/category/${parentCategory.slug}`} className="text-gray-600 hover-text-main-600 transition-1 text-sm">&larr; {parentCategory.name}</Link>
                                                    </li>
                                                )}
                                                {/* Show sibling/related categories */}
                                                {initialCategories.list.map(cat => (
                                                    <li key={cat.id} className="mb-24">
                                                        <Link to={`/category/${cat.slug}`} className={`text-gray-900 hover-text-main-600 transition-1 ${cat.slug === slug ? 'text-main-600 fw-bold' : ''}`}>{cat.name}</Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Categories Filter on Brand Page - Show as checkboxes */}
                                    {filters.includes("category") && type === "brand" && initialCategories.list.length > 0 && (
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
                                                                checked={selectedBrands.includes(cat.slug)} 
                                                                onChange={() => {
                                                                    setSelectedBrands(prev => 
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

                                    {/* Categories Filter on Tag Page */}
                                    {type === "tag" && filters.includes("category") && initialCategories.list.length > 0 && (
                                        <div className="shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32">
                                            <h6 className="text-xl border-bottom border-gray-100 pb-24 mb-24">{initialCategories.title}</h6>
                                            <ul className="max-h-540 overflow-y-auto scroll-sm list-unstyled">
                                                {initialCategories.list.map(cat => (
                                                    <li key={cat.id} className="mb-24">
                                                        <div className="form-check common-check">
                                                            <input 
                                                                className="form-check-input" 
                                                                type="checkbox" 
                                                                id={`tag-cat-${cat.id}`}
                                                                checked={selectedCategories.includes(cat.slug)} 
                                                                onChange={() => {
                                                                    setSelectedCategories(prev => 
                                                                        prev.includes(cat.slug) ? prev.filter(c => c !== cat.slug) : [...prev, cat.slug]
                                                                    );
                                                                    applyFilter();
                                                                }}
                                                            />
                                                            <label className="form-check-label" htmlFor={`tag-cat-${cat.id}`}>{cat.name}</label>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Brands Filter on Tag Page */}
                                    {type === "tag" && filters.includes("brand") && initialBrands.length > 0 && (
                                        <div className="shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32">
                                            <h6 className="text-xl border-bottom border-gray-100 pb-24 mb-24">Brands</h6>
                                            <ul className="max-h-540 overflow-y-auto scroll-sm list-unstyled">
                                                {initialBrands.map(brand => (
                                                    <li key={brand.id} className="mb-24">
                                                        <div className="form-check common-check">
                                                            <input 
                                                                className="form-check-input" 
                                                                type="checkbox" 
                                                                id={`tag-brand-${brand.id}`}
                                                                checked={selectedBrands.includes(brand.slug)} 
                                                                onChange={() => {
                                                                    setSelectedBrands(prev => 
                                                                        prev.includes(brand.slug) ? prev.filter(b => b !== brand.slug) : [...prev, brand.slug]
                                                                    );
                                                                    applyFilter();
                                                                }}
                                                            />
                                                            <label className="form-check-label" htmlFor={`tag-brand-${brand.id}`}>{brand.name}</label>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Price Filter - Only show if "price" is in filters array */}
                                    {filters.includes("price") && (
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
                                    )}

                                    {/* Brands - Show on Category and Tag pages */}
                                    {filters.includes("brand") && type !== "brand" && initialBrands.length > 0 && (
                                        <div className="shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32">
                                            <h6 className="text-xl border-bottom border-gray-100 pb-24 mb-24">Brands</h6>
                                            <ul className="max-h-540 overflow-y-auto scroll-sm list-unstyled">
                                                {initialBrands.map(brand => (
                                                    <li key={brand.id} className="mb-24">
                                                        <div className="form-check common-check">
                                                            <input 
                                                                className="form-check-input" 
                                                                type="checkbox" 
                                                                id={`brand-${brand.id}`}
                                                                checked={selectedBrands.includes(brand.slug)} 
                                                                onChange={() => {
                                                                    setSelectedBrands(prev => 
                                                                        prev.includes(brand.slug) ? prev.filter(b => b !== brand.slug) : [...prev, brand.slug]
                                                                    );
                                                                    applyFilter();
                                                                }}
                                                            />
                                                            <label className="form-check-label" htmlFor={`brand-${brand.id}`}>{brand.name}</label>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Brands on Brand Page - Show all brands with current brand selected */}
                                    {type === "brand" && initialBrands.length > 0 && (
                                        <div className="shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32">
                                            <h6 className="text-xl border-bottom border-gray-100 pb-24 mb-24">Brands</h6>
                                            <ul className="max-h-540 overflow-y-auto scroll-sm list-unstyled">
                                                {initialBrands.map(brand => (
                                                    <li key={brand.id} className="mb-24">
                                                        <Link to={`/brand/${brand.slug}`} className={`text-gray-900 hover-text-main-600 transition-1 ${currentBrand?.slug === brand.slug ? 'text-main-600 fw-bold' : ''}`}>{brand.name}</Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </>
                            )}
                        </aside>
                    </div>

                    <div className="col-lg-9">
                        <div className="flex-between gap-16 flex-wrap mb-40">
                            <span className="text-gray-900 fw-medium">Showing {products.length} {meta && `of ${meta.total}`} products</span>
                            <div className="flex-align gap-16 flex-wrap">
                                <div className="list-grid-btns flex-align gap-12">
                                    <button onClick={() => setIsGrid(false)} className={`w-44 h-44 flex-center border rounded-6 ${!isGrid ? "bg-main-600 text-white border-main-600" : "border-gray-100 text-gray-400"}`}><i className="ph-bold ph-list-dashes" /></button>
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

export default ShopSection;
