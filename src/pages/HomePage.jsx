import React from "react";
import Slider from '../components/Slider';
import FeaturedCategories from "../components/FeaturedCategories";
import FlashDealLazy from "../components/FlashDeal/FlashDealLazy";
import TrendingProductsLazy from "../components/TrendingProduts/TrendingProductsLazy";
import TopSellingLazy from "../components/TopSelling/TopSellingLazy";
import RecommendedProductsLazy from "../components/RecommendedProducts/RecommendedProductsLazy";
import RecentlyViewedLazy from "../components/RecentlyViewed/RecentlyViewedLazy";
import FeaturedBrandsLazy from "../components/FeaturedBrands/FeaturedBrandsLazy";
import { useMeta } from '../hooks/useMeta';
import { pageMetaTags } from '../utils/metaService';

const HomePage = () => {
  const helmetContent = useMeta(pageMetaTags(
    'Home - TIPTOPHUT',
    'Welcome to TIPTOPHUT, your ultimate destination for online shopping. Explore our wide range of products from various categories and enjoy the best deals and discounts.',
    { keywords: 'e-commerce, online shopping, marketplace, TIPTOPHUT' }
  ));

  return (
    <>
      {helmetContent}
      
      {/* BannerTwo - Load immediately (above fold) */}
      <Slider />

      {/* FeaturedCategories - Load immediately (above fold, used in search) */}
      <FeaturedCategories />

      {/* FlashDeal - Lazy load on scroll */}
      <FlashDealLazy />

      {/* TopSelling - Lazy load on scroll */}
      <TopSellingLazy />

      {/* TrendingProducts - Lazy load on scroll */}
      <TrendingProductsLazy />

      {/* RecommendedProducts - Lazy load on scroll */}
      <RecommendedProductsLazy />

      {/* RecentlyViewed - Lazy load on scroll */}
      <RecentlyViewedLazy />

      {/* FeaturedBrands - Lazy load on scroll */}
      <FeaturedBrandsLazy />
    </>
  );
};

export default HomePage;
