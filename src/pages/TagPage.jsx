import React from "react";
import Breadcrumb from "../components/Breadcrumb";
import ShopSection from "../components/ShopSection";

const TagPage = () => {
  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb title={"Shop by Tag"} />

      {/* ShopSection with tag filters (category, brand, price) */}
      <ShopSection type="tag" filters={["category", "brand", "price"]} />
    </>
  );
};

export default TagPage;
