import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import { logout, selectAuth } from "../../features/authSlice";
import TokenExpirationWatcher from "../TokenExpiryWatcher";
import AdminNavbar from "../admin/AdminNavbar";

const AdminLayout: React.FC = () => {
  const dispatch = useDispatch();
  const adminAuth = useSelector(selectAuth);
  const { name } = adminAuth ?? {};

  return (
    <div>
      <TokenExpirationWatcher />
      <AdminNavbar
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
