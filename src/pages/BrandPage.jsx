import React from "react";
import Breadcrumb from "../components/Breadcrumb";
import ShopSection from "../components/ShopSection";

const BrandPage = () => {
  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb title={"Shop by Brand"} />

      {/* ShopSection with brand filters (category, price) */}
      <ShopSection type="brand" filters={["category", "price"]} />
    </>
  );
};

export default BrandPage;
