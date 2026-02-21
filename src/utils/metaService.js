/**
 * MetaService - Utility for managing dynamic meta tags and favicon
 */

import { assetsURL } from "../helper/helper";

// Default meta tags
export const defaultMeta = {
  title: 'TIPTOPHUT - E-commerce',
  description: 'TIPTOPHUT is a leading e-commerce platform offering a wide range of products from various vendors. Shop online for the best deals and enjoy a seamless shopping experience.',
  keywords: 'e-commerce, multi vendor, marketplace, online store',
  ogImage: null,
  ogUrl: null,
  ogType: 'website',
};

/**
 * Generate meta tags structure for react-helmet
 * @param {Object} metaData - Meta data object
 * @returns {Object} - Formatted meta tags for Helmet component
 */
export const generateMetaTags = (metaData = {}) => {
  const meta = {
    ...defaultMeta,
    ...metaData,
  };

  const metaTags = [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'theme-color', content: '#000000' },
    { name: 'title', content: meta.title },
    { name: 'description', content: meta.description },
    { name: 'keywords', content: meta.keywords },
    { name: 'robots', content: 'index, follow' },
    { httpEquiv: 'Content-Type', content: 'text/html; charset=utf-8' },
    { name: 'language', content: 'English' },
    // Open Graph tags
    { property: 'og:title', content: meta.title },
    { property: 'og:description', content: meta.description },
    { property: 'og:type', content: meta.ogType },
  ];

  // Add OG image if available
  if (meta.ogImage) {
    metaTags.push({ property: 'og:image', content: meta.ogImage });
  }

  // Add OG URL if available
  if (meta.ogUrl) {
    metaTags.push({ property: 'og:url', content: meta.ogUrl });
  }

  // Add canonical URL if available
  if (meta.canonicalUrl) {
    metaTags.push({ tag: 'link', rel: 'canonical', href: meta.canonicalUrl });
  }

  return metaTags;
};

/**
 * Generate favicon link for react-helmet
 * @param {string} faviconUrl - URL of the favicon
 * @returns {Object} - Formatted favicon link
 */
export const generateFaviconLink = (faviconUrl) => {
  return {
    rel: 'shortcut icon',
    href: assetsURL + faviconUrl || '/favicon.png',
  };
};

/**
 * Format product meta tags
 * @param {Object} product - Product data from API
 * @returns {Object} - Formatted meta tags for product
 */
export const productMetaTags = (product) => {
  // Extract plain text from HTML if needed
  const stripHtml = (html) => {
    if (!html) return '';
    const tempDiv = typeof document !== 'undefined' ? document.createElement('div') : null;
    if (tempDiv) {
      tempDiv.innerHTML = html;
      return tempDiv.textContent || tempDiv.innerText || '';
    }
    return html;
  };

  // Construct the full image URL
  const rawImage = product.meta_image || product.thumbnail || (product.gallery?.[0] || null);
  const fullImageUrl = rawImage ? (rawImage.startsWith('http') ? rawImage : assetsURL + rawImage) : null;

  return {
    title: product.meta_title || `${product.name} - TIPTOPHUT`,
    description: product.meta_description || stripHtml(product.short_description) || 'Product details',
    keywords: product.tags || product.name || 'product',
    ogImage: fullImageUrl,
    ogUrl: typeof window !== 'undefined' ? window.location.href : '',
    ogType: 'product',
    canonicalUrl: typeof window !== 'undefined' && product.slug 
      ? `${window.location.origin}/product/${product.slug}` 
      : null,
  };
};

/**
 * Format page meta tags for standard pages
 * @param {string} pageTitle - Page title
 * @param {string} pageDescription - Page description
 * @param {Object} options - Additional options
 * @returns {Object} - Formatted meta tags
 */
export const pageMetaTags = (pageTitle, pageDescription, options = {}) => {
  return {
    title: pageTitle,
    description: pageDescription,
    keywords: options.keywords || 'TIPTOPHUT',
    ogImage: options.ogImage || null,
    ogUrl: options.ogUrl || (typeof window !== 'undefined' ? window.location.href : ''),
    canonicalUrl: options.canonicalUrl || 'https://tiptophut.com/',
  };
};
