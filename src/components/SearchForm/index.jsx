import React, { useEffect, useRef } from 'react';
import query from "jquery";
import useCategories from '../../hooks/useCategories';
import './styles.scss';

const SearchForm = () => {
  const { categories, loading } = useCategories();
  const categorySelectRef = useRef(null);

  useEffect(() => {
    if (window.$ && categorySelectRef.current) {
      query(categorySelectRef.current).trigger('change');
    }
  }, [categories, loading]);

  return (
    <form action="#" className="flex-align flex-wrap form-location-wrapper">
      <div className="search-category d-flex h-48 select-border-end-0 radius-end-0 search-form d-sm-flex d-none">
        <select 
          ref={categorySelectRef}
          className="js-example-basic-single border border-gray-200 border-end-0" 
          name="category"
        >
          <option value="all">All Categories</option>
          
          {!loading && categories.map((parent) => (
            <React.Fragment key={parent.id}>
              {/* If parent has sub-categories, wrap them in an optgroup */}
              {parent.sub_categories && parent.sub_categories.length > 0 ? (
                <optgroup label={parent.name}>
                  {/* Option for the parent itself if selectable */}
                  <option value={parent.slug}>{parent.name} (All)</option>
                  {/* Loop through children */}
                  {parent.sub_categories.map((child) => (
                    <option key={child.id} value={child.slug}>
                      {child.name}
                    </option>
                  ))}
                </optgroup>
              ) : (
                /* If no sub-categories, just render a normal option */
                <option value={parent.slug}>{parent.name}</option>
              )}
            </React.Fragment>
          ))}
        </select>

        <div className="search-form__wrapper position-relative">
          <input 
            type="text" 
            className="search-form__input common-input py-13 ps-16 pe-18 rounded-end-pill pe-44" 
            placeholder="Search for a product or brand" 
          />
          <button 
            type="submit" 
            className="w-32 h-32 bg-main-two-600 rounded-circle flex-center text-xl text-white position-absolute top-50 translate-middle-y inset-inline-end-0 me-8"
          >
            <i className="ph ph-magnifying-glass"></i>
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;