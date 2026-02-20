import Breadcrumb from "../components/Breadcrumb";
import ShopSection from "../components/ShopSection";
import useBrand from "../hooks/useBrand";

const BrandPage = () => {
  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb title={"Shop by Brand"} />

      {/* ShopSection with brand filters (category, price) */}
      <ShopSection 
        type="brand" 
        hook={useBrand}
        filters={["category", "price"]} 
      />
    </>
  );
};

export default BrandPage;
