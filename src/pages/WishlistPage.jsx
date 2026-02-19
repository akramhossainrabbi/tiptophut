import React from "react";
import Breadcrumb from "../components/Breadcrumb";
import WishListSection from "../components/WishListSection";

function WishlistPage() {
  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb title={"My Wishlist"} />

      {/* WishListSection */}
      <WishListSection />
    </>
  );
}

export default WishlistPage;
