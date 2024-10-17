import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import { logout, selectAuth } from "../../features/authSlice";
import TokenExpirationWatcher from "../TokenExpiryWatcher";
import VendorNavbar from "../vendor/VendorNavbar";

const VendorLayout: React.FC = () => {
  const dispatch = useDispatch();
  const vendorAuth = useSelector(selectAuth);
  const { name } = vendorAuth ?? {};

  return (
    <div>
      <TokenExpirationWatcher />
      <VendorNavbar
        moduleName="Vendor Panel"
        userName={name || "User"}
        onLogout={() => {
          dispatch(logout());
        }}
      />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default VendorLayout;
