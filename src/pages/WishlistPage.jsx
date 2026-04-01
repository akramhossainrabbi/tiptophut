import React from "react";
import Breadcrumb from "../components/Breadcrumb";
import WishListSection from "../components/WishListSection";
import { useMeta } from '../hooks/useMeta';
import { pageMetaTags } from '../utils/metaService';

function WishlistPage() {
  const helmetContent = useMeta(pageMetaTags(
    'Wish List - TIPTOPHUT',
    'Welcome to TIPTOPHUT, your ultimate destination for online shopping. Explore our wide range of products from various categories and enjoy the best deals and discounts.',
    { 
      keywords: 'e-commerce, online shopping, marketplace, TIPTOPHUT',
      canonicalUrl: 'https://tiptophut.com/'
    }
  ));

  return (
    <>
      {helmetContent}

      {/* Breadcrumb */}
      <Breadcrumb title={"My Wishlist"} />

      {/* WishListSection */}
      <WishListSection />
    </>
  );
}

export default WishlistPage;
