import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import queryJquery from "jquery";
import useCategories from '../../hooks/useCategories';
import useLiveSearch from '../../hooks/useLiveSearch';
import { assetsURL } from '../../helper/helper';
import './styles.scss';

const SearchForm = ({ activeSearch, handleSearchToggle, isMobile = false }) => {
    const { categories, loading: catLoading } = useCategories();
    const categorySelectRef = useRef(null);
    const searchRef = useRef(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [showResults, setShowResults] = useState(false);

    const { results, loading: searchLoading, triggerSearch } = useLiveSearch(searchTerm, selectedCategory);

    useEffect(() => {
        if (window.$ && categorySelectRef.current && !isMobile) {
            const $select = queryJquery(categorySelectRef.current);
            $select.on('change', (e) => {
                setSelectedCategory(e.target.value === 'all' ? 0 : e.target.value);
            });
        }
    }, [categories, catLoading, isMobile]);

    // Close results when clicking outside the search component
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowResults(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Helper to handle link clicks: closes dropdown and mobile overlay
    const handleLinkClick = () => {
        setShowResults(false);
        if (isMobile && handleSearchToggle) {
            handleSearchToggle(); 
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim().length >= 2) {
            setShowResults(true);
            triggerSearch(searchTerm, selectedCategory);
        }
    };

    const renderResults = () => {
        if (!showResults || searchTerm.length < 2) return null;

        return (
            <div className="position-absolute bg-white w-100 shadow-lg rounded-8 mt-2 overflow-hidden z-3 search-results-dropdown">
                {searchLoading ? (
                    <div className="search-skeleton p-3">
                        <div className="search-skeleton__item mb-3" style={{ width: '30%', height: '15px' }}></div>
                        <div className="d-flex align-items-center gap-3 mb-3">
                            <div className="search-skeleton__item" style={{ width: '40px', height: '40px', flexShrink: 0 }}></div>
                            <div className="search-skeleton__item" style={{ width: '80%', height: '20px' }}></div>
                        </div>
                    </div>
                ) : (
                    <>
                        {results.brands.length > 0 && (
                            <div className="p-3 border-bottom">
                                <h6 className="text-xs text-uppercase text-gray-500 mb-2">Brands</h6>
                                {results.brands.map(brand => (
                                    <Link 
                                        key={brand.slug} 
                                        to={`/brand/${brand.slug}`} 
                                        className="d-flex align-items-center gap-2 p-2 hover-bg-gray-50 rounded-4" 
                                        onClick={handleLinkClick}
                                    >
                                        <i className="ph ph-shield-check text-main-600"></i>
                                        <span className="text-sm text-gray-900">{brand.name}</span>
                                    </Link>
                                ))}
                            </div>
                        )}
                        {results.products.length > 0 && (
                            <div className="p-3">
                                <h6 className="text-xs text-uppercase text-gray-500 mb-2">Products</h6>
                                {results.products.map(product => (
                                    <Link 
                                        key={product.slug} 
                                        to={`/product/${product.slug}`} 
                                        className="d-flex align-items-center gap-3 p-2 hover-bg-gray-50 rounded-4" 
                                        onClick={handleLinkClick}
                                    >
                                        <img src={`${assetsURL}${product.image}`} alt="" className="w-40 h-40 object-fit-cover rounded-4" />
                                        <span className="text-sm text-gray-900 text-line-1">{product.name}</span>
                                    </Link>
                                ))}
                            </div>
                        )}
                        {!searchLoading && results.brands.length === 0 && results.products.length === 0 && (
                            <div className="p-3 text-center text-gray-500 text-sm">No results found</div>
                        )}
                    </>
                )}
            </div>
        );
    };

    if (isMobile) {
        return (
            <form onSubmit={handleSearchSubmit} className={`search-box ${activeSearch && "active"}`}>
                <button onClick={handleSearchToggle} type='button' className='search-box__close position-absolute inset-block-start-0 inset-inline-end-0 m-16 w-48 h-48 border border-gray-100 rounded-circle flex-center text-white hover-text-gray-800 hover-bg-white text-2xl transition-1'>
                    <i className='ph ph-x' />
                </button>
                <div className='container'>
                    <div className='position-relative' ref={searchRef}>
                        <input
                            type='text'
                            className='form-control py-16 px-24 text-xl rounded-pill pe-64'
                            placeholder='Search for a product or brand'
                            value={searchTerm}
                            onFocus={() => setShowResults(true)} // Re-show list on focus
                            onChange={(e) => { setSearchTerm(e.target.value); setShowResults(true); }}
                        />
                        <button type='submit' className="w-48 h-48 bg-main-600 rounded-circle flex-center text-xl text-white position-absolute top-50 translate-middle-y inset-inline-end-0 me-8">
                            {searchLoading ? <span className="spinner-border spinner-border-sm"></span> : <i className='ph ph-magnifying-glass' />}
                        </button>
                        {renderResults()}
                    </div>
                </div>
            </form>
        );
    }

    return (
        <form onSubmit={handleSearchSubmit} className="flex-align flex-wrap form-location-wrapper">
            <div ref={searchRef} className="search-category d-flex h-48 select-border-end-0 radius-end-0 search-form d-sm-flex d-none position-relative">
                <select ref={categorySelectRef} className="js-example-basic-single border border-gray-200 border-end-0" name="category">
                    <option value="all">All Categories</option>
                    {!catLoading && categories.map((parent) => (
                        <option key={parent.id} value={parent.id}>{parent.name}</option>
                    ))}
                </select>

                <div className="search-form__wrapper position-relative">
                    <input 
                        type="text" 
                        className="search-form__input common-input py-13 ps-16 pe-18 rounded-end-pill pe-44" 
                        placeholder="Search for a product or brand" 
                        value={searchTerm}
                        onFocus={() => setShowResults(true)} // Re-show list on focus
                        onChange={(e) => { setSearchTerm(e.target.value); setShowResults(true); }}
                    />
                    <button type="submit" className="w-32 h-32 bg-main-two-600 rounded-circle flex-center text-xl text-white position-absolute top-50 translate-middle-y inset-inline-end-0 me-8">
                        {searchLoading ? <span className="spinner-border spinner-border-sm"></span> : <i className="ph ph-magnifying-glass"></i>}
                    </button>
                    {renderResults()}
                </div>
            </div>
        </form>
    );
};

export default SearchForm;