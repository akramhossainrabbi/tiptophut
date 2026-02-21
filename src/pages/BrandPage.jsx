import Breadcrumb from "../components/Breadcrumb";
import BrandShop from "../components/BrandShop";

const BrandPage = () => {
  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb title={"Shop by Brand"} />

      {/* BrandShop Component */}
      <BrandShop />
    </>
  );
};

export default BrandPage;
