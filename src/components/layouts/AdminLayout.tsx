import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import { logoutAdmin, selectAdminAuth } from "../../features/authSlice";
import Navbar from "../Navbar";

const AdminLayout: React.FC = () => {
  const dispatch = useDispatch();
  const adminAuth = useSelector(selectAdminAuth);
  const { name } = adminAuth ?? {};

  return (
    <div>
      <Navbar
        moduleName="Admin Panel"
        userName={name || "User"}
        onLogout={() => {
          dispatch(logoutAdmin());
        }}
      />
      <div style={{ padding: "1rem" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
