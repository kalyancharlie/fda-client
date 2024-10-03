import React from "react";
import { Outlet } from "react-router-dom";

const RootLayout: React.FC = () => {
  return (
    <div>
      Top Nav Bar outside Admin & Vendor
      <Outlet />
    </div>
  );
};

export default RootLayout;
