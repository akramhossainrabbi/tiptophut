import React from "react";
import Breadcrumb from "../components/Breadcrumb";
import Blog from "../components/Blog";
import { useMeta } from '../hooks/useMeta';
import { pageMetaTags } from '../utils/metaService';

const BlogPage = () => {
  const helmetContent = useMeta(pageMetaTags(
    'Blog - TIPTOPHUT',
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
      <Breadcrumb title={"Blog"} />

      {/* Blog */}
      <Blog />
    </>
  );
};

export default BlogPage;
