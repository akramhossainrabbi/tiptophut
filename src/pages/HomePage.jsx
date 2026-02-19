import React from "react";
import Slider from '../components/Slider';
import FeaturedCategories from "../components/FeaturedCategories";
import FlashDeal from "../components/FlashDeal";
import TrendingProducts from "../components/TrendingProduts";
import TopSelling from "../components/TopSelling";
import RecommendedProducts from "../components/RecommendedProducts";
import RecentlyViewed from "../components/RecentlyViewed";
import FeaturedBrands from "../components/FeaturedBrands";
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
      
      {/* BannerTwo */}
      <Slider />

      {/* FeaturedCategories */}
      <FeaturedCategories />

      {/* FlashDeal */}
      <FlashDeal />

      {/* TopSelling */}
      <TopSelling />

      {/* TrendingProducts */}
      <TrendingProducts />

      {/* RecommendedProducts */}
      <RecommendedProducts />

      {/* RecentlyViewed */}
      <RecentlyViewed />

      {/* FeaturedBrands */}
      <FeaturedBrands />
    </>
  );
};

export default HomePage;
