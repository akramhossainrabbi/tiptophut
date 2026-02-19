import React, { useState, useRef, useEffect } from 'react';
import useMenus from '../../hooks/useMenus';
import CategoryMenuComponent from './CategoryMenuComponent';
import './styles.scss';

const CategoryMenu = ({ companyLogo, companyName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { menus, loading, error, fetchMenus } = useMenus();
  const menuRef = useRef(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 992;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (!isOpen) fetchMenus();
    setIsOpen(!isOpen);
  };

  return (
    <div className="category-menu-wrapper" ref={menuRef}>
      {/* THE BUTTON: Mobile-responsive smaller padding */}
      <button 
        onClick={handleToggle} 
        className='category__button flex-align gap-8 fw-medium bg-main-two-600 text-white' 
      >
        <i className='ph ph-dots-nine text-2xl' />
        <span className="d-sm-flex">All Categories</span>
        <i className={`ph ${isOpen ? 'ph-caret-up' : 'ph-caret-down'} ms-auto`} />
      </button>

      {/* BACKDROP: Only active on Mobile */}
      {isOpen && isMobile && (
        <div className="menu-backdrop" onClick={() => setIsOpen(false)} />
      )}

      {isOpen && (
        <CategoryMenuComponent
          menusData={menus}
          loading={loading}
          error={error}
          companyLogo={companyLogo}
          companyName={companyName}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default CategoryMenu;