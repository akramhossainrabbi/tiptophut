import Breadcrumb from "../components/Breadcrumb";
import BrandShop from "../components/BrandShop";

const BrandPage = () => {
  const helmetContent = useMeta(pageMetaTags(
    'Brand - TIPTOPHUT',
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
      <Breadcrumb title={"Shop by Brand"} />

      {/* BrandShop Component */}
      <BrandShop />
    </>
  );
};

export default BrandPage;
