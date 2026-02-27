import React from "react";
import Breadcrumb from "../components/Breadcrumb";
import CartSection from "../components/CartSection";

const CartPage = () => {
  const helmetContent = useMeta(pageMetaTags(
    'Cart - TIPTOPHUT',
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
      <Breadcrumb title={"Cart"} />

      {/* CartSection */}
      <CartSection />

    </>
  );
};

export default CartPage;
