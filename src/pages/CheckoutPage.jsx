import React from "react";
import Breadcrumb from "../components/Breadcrumb";
import Checkout from "../components/Checkout";

const CheckoutPage = () => {
  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb title={"Checkout"} />

      {/* Checkout */}
      <Checkout />
    </>
  );
};

export default CheckoutPage;
