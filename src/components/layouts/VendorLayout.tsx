import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import { logout, selectAuth } from "../../features/authSlice";
import Navbar from "../Navbar";

const VendorLayout: React.FC = () => {
  const dispatch = useDispatch();
  const vendorAuth = useSelector(selectAuth);
  const { name } = vendorAuth ?? {};

  return (
    <div>
      <Navbar
        moduleName="Vendor Panel"
        userName={name || "User"}
        onLogout={() => {
          dispatch(logout());
        }}
      />
      <div style={{ padding: "1rem" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default VendorLayout;
