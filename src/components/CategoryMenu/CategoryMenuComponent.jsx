import React, { useState, useMemo, memo } from 'react';
import { Link } from 'react-router-dom';
import { textLimit } from '../../utils/textHelpers';
import { getMenuLink } from '../../utils/routeHelpers';
import CategoryMenuSkeleton from './CategoryMenuSkeleton';
import Logo from '../Logo';

const CategoryMenuComponent = memo(({ menusData, loading, onClose }) => {
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [mobileStage, setMobileStage] = useState(1);
  const [selection, setSelection] = useState({ menu: 0, col: 0 });
  const isMobile = window.innerWidth < 992;

  // Optimized lookup for the 'multi_mega_menu' root
  const menuItems = useMemo(() => {
    if (!Array.isArray(menusData)) return [];
    return menusData.find(m => m.menu_type === 'multi_mega_menu')?.menus || [];
  }, [menusData]);

  if (loading) return <CategoryMenuSkeleton />;

  const activeMenu = menuItems[isMobile ? selection.menu : hoveredIndex]?.menu;

  return (
    <div className="category-dropdown-box shadow-lg rounded-bottom-4 bg-white active animate-fade-in">
      
      {/* MOBILE HEADER: Original Logo & Close design */}
      {isMobile && (
        <div className="mobile-header d-flex align-items-center justify-content-between p-3 border-bottom bg-white sticky-top">
          <button type='button' className="close-button" onClick={onClose} aria-label="Close">
            <i className='ph ph-x' />{" "}
          </button>
          <Logo className='mobile-menu__logo' />
        </div>
      )}

      <div className="d-flex flex-column flex-lg-row h-100">
        {/* STAGE 1: Sidebar - Original Design with dynamic data */}
        <ul className={`category-sidebar list-unstyled m-0 py-2 border-end ${isMobile && mobileStage > 1 ? 'd-none' : ''}`}>
          {menuItems.map((item, idx) => (
            <li 
              key={idx} 
              className={`sidebar-item px-4 padding-y-3 d-flex align-items-center gap-3 cursor-pointer hover-bg-neutral-100 ${hoveredIndex === idx ? 'active' : ''}`}
              onMouseEnter={() => !isMobile && setHoveredIndex(idx)}
              onClick={() => isMobile && (setSelection({ ...selection, menu: idx }) || setMobileStage(2))}
            >
              {/* Uses icon from panel menu if available, else fallback */}
              <i className={item.menu?.icon || 'ph ph-circle'} />
              <span className="flex-grow-1 text-capitalize">
                {textLimit(item.title, 25)}
              </span>
              <i className="ph ph-caret-right opacity-50" />
            </li>
          ))}
        </ul>

        {/* DESKTOP MEGA PANEL - Original g-5 p-5 spacing with horizontal scroll fix */}
        {!isMobile && activeMenu && (
          <div className="mega-panel-container flex-grow-1 overflow-y-auto overflow-x-hidden">
            <div className="row g-5 p-5 m-0">
              {activeMenu.columns?.map((col, cIdx) => (
                <div key={cIdx} className="col-md-4">
                  <h6 className="fw-bold text-dark border-bottom pb-3 mb-3 text-capitalize">
                    {col.column}
                  </h6>
                  <ul className="list-unstyled">
                    {col.elements?.map((el, eIdx) => (
                      <li key={eIdx} className="mb-2">
                        {/* Dynamic Link Utility Integration */}
                        <Link 
                          to={getMenuLink(el)} 
                          onClick={onClose} 
                          className="text-muted text-decoration-none hover-primary-link text-capitalize"
                        >
                          {el.title || el.category?.name || el.brand?.name || 'Untitled'}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MOBILE DRILL DOWN - Original mobile nav design */}
        {isMobile && mobileStage > 1 && (
          <div className="mobile-nav-view w-100">
            <button className="mobile-back-btn p-3 w-100 border-0 border-bottom d-flex align-items-center gap-2" onClick={() => setMobileStage(mobileStage - 1)}>
              <i className="ph ph-arrow-left" /> Back
            </button>
            <div className="p-2">
              {/* STAGE 2: Category/Column selection */}
              {mobileStage === 2 && activeMenu?.columns?.map((col, cIdx) => (
                <div key={cIdx} className="p-3 border-bottom d-flex justify-content-between" onClick={() => setSelection({...selection, col: cIdx}) || setMobileStage(3)}>
                  <span className="text-capitalize">{col.column}</span>
                  <i className="ph ph-caret-right" />
                </div>
              ))}
              {/* STAGE 3: Final Link Elements */}
              {mobileStage === 3 && activeMenu?.columns[selection.col]?.elements?.map((el, eIdx) => (
                <Link 
                  to={getMenuLink(el)} 
                  onClick={onClose} 
                  className="d-block p-3 border-bottom text-dark text-decoration-none"
                >
                  {el.title || el.category?.name || el.brand?.name || 'Untitled'}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default CategoryMenuComponent;