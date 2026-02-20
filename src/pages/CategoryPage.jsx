import React from "react";
import Breadcrumb from "../components/Breadcrumb";
import ShopSection from "../components/ShopSection";

const CategoryPage = () => {
  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb title={"Shop by Category"} />

      {/* ShopSection with category filters (brand, price) */}
      <ShopSection type="category" filters={["brand", "price"]} />
    </>
  );
};

export default CategoryPage;
