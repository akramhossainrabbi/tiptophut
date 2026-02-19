import React from "react";
import Breadcrumb from "../components/Breadcrumb";
import BlogDetails from "../components/BlogDetails";

const BlogDetailsPage = () => {
  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb title={"Blog Details"} />

      {/* BlogDetails */}
      <BlogDetails />
    </>
  );
};

export default BlogDetailsPage;
