import { useEffect, useState } from "react";
import query from "jquery";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAppSettings } from "../../context/SettingsContext";
import { assetsURL } from "../../helper/helper";
import CategoryMenu from "../CategoryMenu";
import SearchForm from "../SearchForm";
import { useAuth } from '../../context/AuthContext';
import { useCart } from "../../context/CartContext";
import Logo from "../Logo";

const Header = ({ settings = {} }) => {
  const { generalSettings, loading, error } = useAppSettings();

  // State hooks
  const [scroll, setScroll] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeSearch, setActiveSearch] = useState(false);
  const [activeCategory, setActiveCategory] = useState(false);
  
  // Custom hooks
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  
  const { cartCount } = useCart();

  // Static language and currency
  const selectedLanguage = "English";
  const selectedCurrency = "BDT";
  
  const phoneNumber = generalSettings?.phone || "+880 1711 223344";
  
  // Default settings
  const defaultSettings = {
    showTopBar: true,
    showPhone: true,
    showLanguage: true,
    showCurrency: true,
    showWishlist: true,
    showCompare: false,
    menuItems: getMenuItems()
  };
  
  const mergedSettings = { ...defaultSettings, ...settings };

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.pageYOffset > 150);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Select2 initialization
  useEffect(() => {
    const selectElement = query(".js-example-basic-single");
    if (selectElement.length) {
      selectElement.select2();
    }

    return () => {
      if (selectElement.length && selectElement.data("select2")) {
        selectElement.select2("destroy");
      }
    };
  }, []);

  // Event handlers
  const handleMenuClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  
  const handleMenuToggle = () => {
    setMenuActive(!menuActive);
  };
  
  const handleSearchToggle = () => {
    setActiveSearch(!activeSearch);
  };
  
  const handleCategoryToggle = () => {
    setActiveCategory(!activeCategory);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // Helper function to get menu items
  function getMenuItems() {
    const baseItems = [
      {
        title: "Home",
        path: "#",
        hasSubmenu: true,
        submenu: [
          { title: "Home Grocery", path: "/" },
          { title: "Home Electronics", path: "/index-two" },
          { title: "Home Fashion", path: "/index-three" }
        ]
      },
      {
        title: "Shop",
        path: "#",
        hasSubmenu: true,
        submenu: [
          { title: "Shop", path: "/shop" },
          { title: "Shop Details", path: "/product-details" },
          { title: "Shop Details Two", path: "/product-details-two" }
        ]
      },
      {
        title: "Pages",
        path: "#",
        hasSubmenu: true,
        badge: "New",
        badgeColor: "bg-warning-600",
        submenu: [
          { title: "Cart", path: "/cart" },
          { title: "Wishlist", path: "/wishlist" },
          { title: "Checkout", path: "/checkout" },
          { title: "Account", path: "/login" }
        ]
      },
      {
        title: "Blog",
        path: "#",
        hasSubmenu: true,
        submenu: [
          { title: "Blog", path: "/blog" },
          { title: "Blog Details", path: "/blog-details" }
        ]
      },
      {
        title: "Contact Us",
        path: "/contact",
        hasSubmenu: false
      }
    ];

    return baseItems;
  }

  // CSS classes
  const variantClass = {
    topBar: "bg-main-two-600",
    searchButton: "bg-main-two-600",
    cartBadge: "bg-main-two-600",
    phoneButton: "bg-main-two-600 hover-bg-main-two-800",
    iconColor: "text-gray-700",
    textColor: "text-white",
    middleHeader: "bg-color-one"
  };

  return (
    <>
      {/* Overlay */}
      <div className='overlay' />
      <div className={`side-overlay ${(menuActive || activeCategory) && "show"}`} />
      
      {/* Search Box */}
      <form action='#' className={`search-box ${activeSearch && "active"}`}>
        <button 
          onClick={handleSearchToggle} 
          type='button' 
          className='search-box__close position-absolute inset-block-start-0 inset-inline-end-0 m-16 w-48 h-48 border border-gray-100 rounded-circle flex-center text-white hover-text-gray-800 hover-bg-white text-2xl transition-1'
        >
          <i className='ph ph-x' />
        </button>
        <div className='container'>
          <div className='position-relative'>
            <input
              type='text'
              className='form-control py-16 px-24 text-xl rounded-pill pe-64'
              placeholder='Search for a product or brand'
            />
            <button
              type='submit'
              className={`w-48 h-48 ${variantClass.searchButton} rounded-circle flex-center text-xl text-white position-absolute top-50 translate-middle-y inset-inline-end-0 me-8`}
            >
              <i className='ph ph-magnifying-glass' />
            </button>
          </div>
        </div>
      </form>
      
      {/* Mobile Menu */}
      <div className={`mobile-menu scroll-sm d-lg-none d-block ${menuActive && "active"}`}>
        <button
          onClick={() => {
            handleMenuToggle();
            setActiveIndex(null);
          }}
          type='button'
          className='close-button'
        >
          <i className='ph ph-x' />
        </button>
        <div className='mobile-menu__inner'>
          <Logo className="navbar-brand" />
          <div className='mobile-menu__menu'>
            <ul className='nav-menu flex-align nav-menu--mobile'>
              {mergedSettings.menuItems.map((item, index) => (
                <li
                  key={index}
                  onClick={() => item.hasSubmenu && handleMenuClick(index)}
                  className={`on-hover-item nav-menu__item ${item.hasSubmenu ? 'has-submenu' : ''} ${activeIndex === index ? "d-block" : ""}`}
                >
                  {item.badge && (
                    <span className={`badge-notification ${item.badgeColor} text-white text-sm py-2 px-8 rounded-4`}>
                      {item.badge}
                    </span>
                  )}
                  <Link to={item.path} className='nav-menu__link'>
                    {item.title}
                  </Link>
                  {item.hasSubmenu && (
                    <ul className={`on-hover-dropdown common-dropdown nav-submenu scroll-sm ${activeIndex === index ? "open" : ""}`}>
                      {item.submenu.map((subItem, subIndex) => (
                        <li key={subIndex} className='common-dropdown__item nav-submenu__item'>
                          <Link
                            to={subItem.path}
                            className='common-dropdown__link nav-submenu__link hover-bg-neutral-100'
                            onClick={() => setActiveIndex(null)}
                          >
                            {subItem.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Top Bar - Updated with new content */}
      <div className={`header-top ${variantClass.topBar} flex-between`}>
        <div className='container container-lg'>
          <div className='flex-between flex-wrap gap-8'>
            {/* Left side items - About Us and Returns Policy only */}
            <ul className='flex-align flex-wrap d-none d-md-flex'>
                <li className='border-right-item'>
                    <Link to='/about' className={`${variantClass.textColor} text-sm hover-text-decoration-underline`}>
                    About us
                    </Link>
                </li>
                <li className='border-right-item'>
                    <Link to='/free-delivery' className={`${variantClass.textColor} text-sm hover-text-decoration-underline`}>
                    Free Delivery
                    </Link>
                </li>
                <li className='border-right-item'>
                    <Link to='/returns' className={`${variantClass.textColor} text-sm hover-text-decoration-underline`}>
                    Returns Policy
                    </Link>
                </li>
            </ul>
            
            {/* Right side items - Help Center, Language, Currency, My Account */}
            <ul className='header-top__right flex-align flex-wrap'>
              {/* Help Center */}
              <li className='on-hover-item border-right-item border-right-item-sm-space has-submenu arrow-white'>
                <Link to='#' className={`text-white text-sm py-8 ${variantClass.textColor}`}>
                  Help Center
                </Link>
                <ul className='on-hover-dropdown common-dropdown common-dropdown--sm max-h-200 scroll-sm px-0 py-8'>
                  <li className='nav-submenu__item'>
                    <Link to='/call-center' className='nav-submenu__link hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0'>
                      <span className='text-sm d-flex'>
                        <i className='ph ph-headset' />
                      </span>
                      Call Center
                    </Link>
                  </li>
                  <li className='nav-submenu__item'>
                    <Link to='/live-chat' className='nav-submenu__link hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0'>
                      <span className='text-sm d-flex'>
                        <i className='ph ph-chat-circle-dots' />
                      </span>
                      Live Chat
                    </Link>
                  </li>
                </ul>
              </li>
              
              {/* Language - English only */}
              {mergedSettings.showLanguage && (
                <li className='on-hover-item border-right-item border-right-item-sm-space has-submenu arrow-white'>
                  <Link to='#' className={`selected-text text-white text-sm py-8 ${variantClass.textColor}`}>
                    Eng
                  </Link>
                  <ul className='selectable-text-list on-hover-dropdown common-dropdown common-dropdown--sm max-h-200 scroll-sm px-0 py-8'>
                    <li>
                      <Link to='#' className='hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0'>
                        <img src={assetsURL + "/images/thumbs/flag1.png"} alt='' className='w-16 h-12 rounded-4 border border-gray-100' />
                        English
                      </Link>
                    </li>
                  </ul>
                </li>
              )}
              
              {/* Currency - BDT only */}
              {mergedSettings.showCurrency && (
                <li className='on-hover-item border-right-item border-right-item-sm-space has-submenu arrow-white'>
                  <Link to='#' className={`selected-text text-white text-sm py-8 ${variantClass.textColor}`}>
                    BDT
                  </Link>
                  <ul className='selectable-text-list on-hover-dropdown common-dropdown common-dropdown--sm max-h-200 scroll-sm px-0 py-8'>
                    <li>
                      <Link to='#' className='hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0'>
                        <img src={assetsURL + "/images/thumbs/flag6.png"} alt='' className='w-16 h-12 rounded-4 border border-gray-100' />
                        BDT
                      </Link>
                    </li>
                  </ul>
                </li>
              )}
              
              {/* My Account - No dropdown functionality */}
              <li className='border-right-item'>
                {user ? (
                  <div className='flex-align gap-6'>
                    <Link to='/profile' className={`${variantClass.textColor} text-sm py-8 flex-align gap-6`}>
                      <span className='icon text-md d-flex'>
                        <i className='ph ph-user-circle' />
                      </span>
                      <span className='hover-text-decoration-underline'>
                        {user?.name}
                      </span>
                    </Link>
                    <span className='text-white mx-1'>|</span>
                    <Link 
                      to='#' 
                      onClick={handleLogout} 
                      className={`${variantClass.textColor} text-sm py-8 hover-text-decoration-underline`}
                    >
                      Logout
                    </Link>
                  </div>
                ) : (
                  <Link to='/login' className={`${variantClass.textColor} text-sm py-8 flex-align gap-6`}>
                    <span className='icon text-md d-flex'>
                      <i className='ph ph-user-circle' />
                    </span>
                    <span className='hover-text-decoration-underline'>
                      My Account
                    </span>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Middle Header */}
      <header className={`header-middle ${variantClass.middleHeader} border-bottom border-gray-100`}>
        <div className='container container-lg'>
          <nav className='header-inner flex-between'>
            {/* Logo */}
            <div className='logo'>
              <Logo className="navbar-brand" />
            </div>
            
            {/* Search Form */}
            <SearchForm />
            
            {/* Header Right Icons */}
            <div className='header-right flex-align d-lg-block d-none'>
              <div className='flex-align flex-wrap gap-12'>
                <button
                  onClick={handleSearchToggle}
                  type='button'
                  className='search-icon flex-align d-lg-none d-flex gap-4 item-hover'
                >
                  <span className={`text-2xl ${variantClass.iconColor} d-flex position-relative`}>
                    <i className='ph ph-magnifying-glass' />
                  </span>
                </button>
                
                {/* Profile Button */}
                <Link to={user ? '/profile' : '/login'} className='flex-align gap-4 item-hover'>
                  <span className={`text-2xl ${variantClass.iconColor} d-flex position-relative me-6 mt-6`}>
                    <i className='ph ph-user' />
                  </span>
                  <span className='text-md text-gray-500 d-none d-lg-flex'>
                    {user ? user.name : 'Profile'}
                  </span>
                </Link>
                
                {mergedSettings.showWishlist && (
                  <Link to='/wishlist' className='flex-align gap-4 item-hover'>
                    <span className={`text-2xl ${variantClass.iconColor} d-flex position-relative me-6 mt-6`}>
                      <i className='ph ph-heart' />
                      <span className={`w-16 h-16 flex-center rounded-circle ${variantClass.cartBadge} text-white text-xs position-absolute top-n6 end-n4`}>
                        2
                      </span>
                    </span>
                    <span className='text-md text-gray-500 d-none d-lg-flex'>
                      Wishlist
                    </span>
                  </Link>
                )}
                
                {mergedSettings.showCompare && (
                  <Link to='/compare' className='flex-align gap-4 item-hover'>
                    <span className={`text-2xl ${variantClass.iconColor} d-flex position-relative me-6 mt-6`}>
                      <i className='ph-fill ph-shuffle' />
                      <span className={`w-16 h-16 flex-center rounded-circle ${variantClass.cartBadge} text-white text-xs position-absolute top-n6 end-n4`}>
                        2
                      </span>
                    </span>
                    <span className='text-md text-gray-500 d-none d-lg-flex'>
                      Compare
                    </span>
                  </Link>
                )}
                
                <Link to='/cart' className='flex-align gap-4 item-hover'>
                  <span className={`text-2xl ${variantClass.iconColor} d-flex position-relative me-6 mt-6`}>
                    <i className='ph ph-shopping-cart-simple' />
                    <span className={`w-16 h-16 flex-center rounded-circle ${variantClass.cartBadge} text-white text-xs position-absolute top-n6 end-n4`}>
                      {cartCount}
                    </span>
                  </span>
                  <span className='text-md text-gray-500 d-none d-lg-flex'>
                    Cart
                  </span>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </header>
      
      {/* Main Header */}
      <header className={`header bg-white border-bottom border-gray-100 ${scroll && "fixed-header"}`}>
        <div className='container container-lg'>
          <nav className='header-inner d-flex justify-content-between gap-8'>
            <div className='flex-align menu-category-wrapper'>
              {/* Category Menu */}
              <CategoryMenu />
              
              {/* Main Navigation Menu */}
              <div className='header-menu d-lg-block d-none'>
                <ul className='nav-menu flex-align'>
                  {mergedSettings.menuItems.map((item, index) => (
                    <li key={index} className={`on-hover-item nav-menu__item ${item.hasSubmenu ? 'has-submenu' : ''}`}>
                      {item.badge && (
                        <span className={`badge-notification ${item.badgeColor} text-white text-sm py-2 px-8 rounded-4`}>
                          {item.badge}
                        </span>
                      )}
                      <Link to={item.path} className='nav-menu__link'>
                        {item.title}
                      </Link>
                      {item.hasSubmenu && (
                        <ul className='on-hover-dropdown common-dropdown nav-submenu scroll-sm'>
                          {item.submenu.map((subItem, subIndex) => (
                            <li key={subIndex} className='common-dropdown__item nav-submenu__item'>
                              <NavLink
                                to={subItem.path}
                                className={({ isActive }) =>
                                  isActive
                                    ? "common-dropdown__link nav-submenu__link hover-bg-neutral-100 activePage"
                                    : "common-dropdown__link nav-submenu__link hover-bg-neutral-100"
                                }
                              >
                                {subItem.title}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Header Right Section */}
            <div className='header-right flex-align'>
              {/* Phone Number */}
              {mergedSettings.showPhone && (
                <Link
                  to={`/tel:${phoneNumber}`}
                  className={`${variantClass.phoneButton} text-white p-12 h-100 flex-align gap-8 text-lg d-lg-flex d-none`}
                >
                  <div className='d-flex text-32'>
                    <i className='ph ph-phone-call' />
                  </div>
                  {phoneNumber}
                </Link>
              )}
              
              {/* Mobile Icons */}
              <div className='me-16 d-lg-none d-block'>
                <div className='flex-align flex-wrap gap-12'>
                  <button
                    onClick={handleSearchToggle}
                    type='button'
                    className='search-icon flex-align d-lg-none d-flex gap-4 item-hover'
                  >
                    <span className='text-2xl text-gray-700 d-flex position-relative'>
                      <i className='ph ph-magnifying-glass' />
                    </span>
                  </button>
                  
                  {/* Profile Button for Mobile */}
                  <Link to={user ? '/profile' : '/login'} className='flex-align gap-4 item-hover'>
                    <span className='text-2xl text-gray-700 d-flex position-relative me-6 mt-6'>
                      <i className='ph ph-user' />
                    </span>
                    <span className='text-md text-gray-500 d-none d-lg-flex'>
                      {user ? user.name : 'Profile'}
                    </span>
                  </Link>
                  
                  {mergedSettings.showWishlist && (
                    <Link to='/wishlist' className='flex-align gap-4 item-hover'>
                      <span className='text-2xl text-gray-700 d-flex position-relative me-6 mt-6'>
                        <i className='ph ph-heart' />
                        <span className={`w-16 h-16 flex-center rounded-circle ${variantClass.cartBadge} text-white text-xs position-absolute top-n6 end-n4`}>
                          2
                        </span>
                      </span>
                      <span className='text-md text-gray-500 d-none d-lg-flex'>
                        Wishlist
                      </span>
                    </Link>
                  )}
                  
                  {mergedSettings.showCompare && (
                    <Link to='/compare' className='flex-align gap-4 item-hover'>
                      <span className='text-2xl text-gray-700 d-flex position-relative me-6 mt-6'>
                        <i className='ph-fill ph-shuffle' />
                        <span className={`w-16 h-16 flex-center rounded-circle ${variantClass.cartBadge} text-white text-xs position-absolute top-n6 end-n4`}>
                          2
                        </span>
                      </span>
                      <span className='text-md text-gray-500 d-none d-lg-flex'>
                        Compare
                      </span>
                    </Link>
                  )}
                  
                  <Link to='/cart' className='flex-align gap-4 item-hover'>
                    <span className='text-2xl text-gray-700 d-flex position-relative me-6 mt-6'>
                      <i className='ph ph-shopping-cart-simple' />
                      <span className={`w-16 h-16 flex-center rounded-circle ${variantClass.cartBadge} text-white text-xs position-absolute top-n6 end-n4`}>
                        {cartCount}
                      </span>
                    </span>
                    <span className='text-md text-gray-500 d-none d-lg-flex'>
                      Cart
                    </span>
                  </Link>
                </div>
              </div>
              
              {/* Mobile Menu Toggle Button */}
              <button
                onClick={handleMenuToggle}
                type='button'
                className='toggle-mobileMenu d-lg-none ms-3n text-gray-800 text-4xl d-flex'
              >
                <i className='ph ph-list' />
              </button>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;