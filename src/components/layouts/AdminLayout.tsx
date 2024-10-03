import React from "react";
import { Outlet } from "react-router-dom";

const AdminLayout: React.FC = () => {
  return (
    <div>
      <div>Admin NavBar</div>
      <div>
        <Outlet />
      </div>
      <div>Admin Footer</div>
    </div>
  );
};

export default AdminLayout;
