import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import { logout, selectAuth } from "../../features/authSlice";
import Navbar from "../Navbar";
import TokenExpirationWatcher from "../TokenExpiryWatcher";

const AdminLayout: React.FC = () => {
  const dispatch = useDispatch();
  const adminAuth = useSelector(selectAuth);
  const { name } = adminAuth ?? {};

  return (
    <div>
      <TokenExpirationWatcher />
      <Navbar
        moduleName="Admin Panel"
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

export default AdminLayout;
