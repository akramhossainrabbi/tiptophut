import React from "react";
import Breadcrumb from "../components/Breadcrumb";
import ShopSection from "../components/ShopSection";

const ShopPage = ({ type = "category" }) => {
  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb title={"Shop"} />

      {/* ShopSection */}
      <ShopSection type={type} />
    </>
  );
};

export default ShopPage;
