import React from "react";
import { Outlet } from "react-router-dom";

const VendorLayout: React.FC = () => {
  return (
    <div>
      <div>Vendor NavBar</div>
      <div>
        <Outlet />
      </div>
      <div>Vendor Footer</div>
    </div>
  );
};

export default VendorLayout;
