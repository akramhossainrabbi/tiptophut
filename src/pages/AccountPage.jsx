import React from "react";
import Breadcrumb from "../components/Breadcrumb";
import Account from "../components/Account";

const AccountPage = () => {
  return (
    <>

      {/* Breadcrumb */}
      <Breadcrumb title={"Account"} />

      {/* Account */}
      <Account />
    </>
  );
};

export default AccountPage;
