import Breadcrumb from "../components/Breadcrumb";
import ShopSection from "../components/ShopSection";
import useCategory from "../hooks/useCategory";

const CategoryPage = () => {
  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb title={"Shop by Category"} />

      {/* ShopSection with category filters (brand, price) */}
      <ShopSection 
        type="category" 
        hook={useCategory}
        filters={["brand", "price"]} 
      />
    </>
  );
};

export default CategoryPage;
