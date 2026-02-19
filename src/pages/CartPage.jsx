import React from "react";
import Breadcrumb from "../components/Breadcrumb";
import CartSection from "../components/CartSection";

const CartPage = () => {
  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb title={"Cart"} />

      {/* CartSection */}
      <CartSection />

    </>
  );
};

export default CartPage;
