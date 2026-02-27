import React from "react";
import Breadcrumb from "../components/Breadcrumb";
import ShopSection from "../components/ShopSection";

const ShopPage = ({ type = "category" }) => {
  const helmetContent = useMeta(pageMetaTags(
    'Shop - TIPTOPHUT',
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
      <Breadcrumb title={"Shop"} />

      {/* ShopSection */}
      <ShopSection type={type} />
    </>
  );
};

export default ShopPage;
