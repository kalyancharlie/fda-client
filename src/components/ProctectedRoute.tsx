// components/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "../store/store"; // Adjust the import based on your store setup
import { IUser } from "../interfaces/User.interface";

const ProtectedRoute: React.FC<{
  children: React.ReactNode;
  role: IUser["role"];
}> = ({ children, role }) => {
  const authState = useSelector((state: RootState) => {
    return role === "VENDOR"
      ? state.auth.vendorAuth
      : role === "ADMIN"
      ? state.auth.adminAuth
      : { isAuthenticated: false };
  });

  if (!authState?.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
