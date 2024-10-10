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
    const auth = state.auth.auth;
    const { role: userRole, isAuthenticated } = auth ?? {};
    if (userRole === role) {
      return { isAuthenticated };
    }
    return { isAuthenticated: false };
  });

  if (!authState?.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
