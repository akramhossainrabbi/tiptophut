// Base URL for API calls
export const baseURL = process.env.REACT_APP_API_URL || 'https://api.tiptophut.com';

// Cache settings
export const CACHE_KEYS = {
  SETTINGS: 'settings-cache-v2',
  MENUS: 'menu-cache-v1',
  SLIDERS: 'slider-cache-v3',
  CATEGORIES: 'category-cache-v1',
  FEATURED_CATEGORIES: 'featured-category-cache-v3',
  FLASHDEAL: 'flashdeal-cache-v3',
  TOP_SELLING: 'top-selling-cache-v3',
  TRENDING_PRODUCTS: 'trending-products-cache-v3',
  RECOMMENDED: 'recommended-products-cache-v3',
  RECENT_PRODUCTS: 'recent-products-cache-v3',
  FEATURED_BRANDS: 'featured-brands-cache-v3',
  USER: "auth_user",
  TOKEN: "auth_token",
};

export const CACHE_EXPIRY = {
  SETTINGS: 15 * 60 * 1000, // 15 minutes
  MENUS: 15 * 60 * 1000, // 15 minutes
  SLIDERS: 10 * 60 * 1000, // 10 minutes
  CATEGORIES: 10 * 60 * 1000, // 10 minutes
  FLASHDEAL: 10 * 60 * 1000, // 10 minutes
  TOP_SELLING: 10 * 60 * 1000, // 10 minutes
  TRENDING_PRODUCTS: 10 * 60 * 1000, // 10 minutes
  RECOMMENDED: 10 * 60 * 1000, // 10 minutes
  RECENT_PRODUCTS: 10 * 60 * 1000, // 10 minutes
  FEATURED_BRANDS: 10 * 60 * 1000, // 10 minutes
};