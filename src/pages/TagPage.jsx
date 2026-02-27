import Breadcrumb from "../components/Breadcrumb";
import TagShop from "../components/TagShop";

const TagPage = () => {
  const helmetContent = useMeta(pageMetaTags(
    'Tag - TIPTOPHUT',
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
      <Breadcrumb title={"Shop by Tag"} />

      {/* TagShop Component */}
      <TagShop />
    </>
  );
};

export default TagPage;
