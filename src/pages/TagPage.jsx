import Breadcrumb from "../components/Breadcrumb";
import ShopSection from "../components/ShopSection";
import useTag from "../hooks/useTag";

const TagPage = () => {
  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb title={"Shop by Tag"} />

      {/* ShopSection with tag filters (category, brand, price) */}
      <ShopSection 
        type="tag" 
        hook={useTag}
        filters={["category", "brand", "price"]} 
      />
    </>
  );
};

export default TagPage;
