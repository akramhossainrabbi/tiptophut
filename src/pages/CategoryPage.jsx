import Breadcrumb from "../components/Breadcrumb";
import CategoryShop from "../components/CategoryShop";
import { useMeta } from '../hooks/useMeta';
import { pageMetaTags } from '../utils/metaService';

const CategoryPage = () => {
  const helmetContent = useMeta(pageMetaTags(
    'Category - TIPTOPHUT',
    'Welcome to TIPTOPHUT, your ultimate destination for online shopping. Explore our wide range of products from various categories and enjoy the best deals and discounts.',
    { 
      keywords: 'e-commerce, online shopping, marketplace, TIPTOPHUT',
      canonicalUrl: 'https://tiptophut.com/'
    }
  ));

  return (
    <>
      {helmetContent}

      {/* Breadcrumb */}
      <Breadcrumb title={"Shop by Category"} />

      {/* CategoryShop Component */}
      <CategoryShop />
    </>
  );
};

export default CategoryPage;
