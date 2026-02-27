import React from "react";
import Breadcrumb from "../components/Breadcrumb";
import BlogDetails from "../components/BlogDetails";

const BlogDetailsPage = () => {
  const helmetContent = useMeta(pageMetaTags(
    'Blog Details - TIPTOPHUT',
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
      <Breadcrumb title={"Blog Details"} />

      {/* BlogDetails */}
      <BlogDetails />
    </>
  );
};

export default BlogDetailsPage;
