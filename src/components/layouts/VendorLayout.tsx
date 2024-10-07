import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import { logoutVendor, selectVendorAuth } from "../../features/authSlice";
import Navbar from "../Navbar";

const VendorLayout: React.FC = () => {
  const dispatch = useDispatch();
  const vendorAuth = useSelector(selectVendorAuth);
  const { name } = vendorAuth ?? {};

  return (
    <div>
      <Navbar
        moduleName="Vendor Panel"
        userName={name || "User"}
        onLogout={() => {
          dispatch(logoutVendor());
        }}
      />
      <div style={{ padding: "1rem" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default VendorLayout;
