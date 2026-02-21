import Breadcrumb from "../components/Breadcrumb";
import TagShop from "../components/TagShop";

const TagPage = () => {
  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb title={"Shop by Tag"} />

      {/* TagShop Component */}
      <TagShop />
    </>
  );
};

export default TagPage;
