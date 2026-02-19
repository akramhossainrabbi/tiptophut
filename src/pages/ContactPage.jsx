import React from "react";
import Breadcrumb from "../components/Breadcrumb";
import Contact from "../components/Common/Contact";

const ContactPage = () => {
  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb title={"Contact"} />

      {/* Contact */}
      <Contact />
    </>
  );
};

export default ContactPage;
