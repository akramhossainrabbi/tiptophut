import React from "react";
import Breadcrumb from "../components/Breadcrumb";
import Blog from "../components/Blog";

const BlogPage = () => {
  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb title={"Blog"} />

      {/* Blog */}
      <Blog />
    </>
  );
};

export default BlogPage;
