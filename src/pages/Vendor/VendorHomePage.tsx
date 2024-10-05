import React from "react";
import VendorDashboard from "../../components/VendorDashBoard";
import MenuDashboard from "../../components/MenuDashboard";

const VendorHomePage: React.FC = () => {
  return <div>Welcome! Vendor
    <div><VendorDashboard/></div>;
    <div><MenuDashboard/></div>;

  </div>;
   
};

export default VendorHomePage;
