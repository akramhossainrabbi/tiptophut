import Breadcrumb from "../components/Breadcrumb";
import CategoryShop from "../components/CategoryShop";

const CategoryPage = () => {
  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb title={"Shop by Category"} />

      {/* CategoryShop Component */}
      <CategoryShop />
    </>
  );
};

export default CategoryPage;
