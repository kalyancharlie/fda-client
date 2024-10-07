import { Navigate, RouteObject } from "react-router-dom";

import VendorLayout from "../components/layouts/VendorLayout";
import VendorHomePage from "../pages/Vendor/VendorHomePage/VendorHomePage";
import ProtectedRoute from "../components/ProctectedRoute";

const router: RouteObject[] = [
  {
    path: "vendor",
    element: <VendorLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="home" replace />,
      },
      {
        path: "home",
        element: (
          <ProtectedRoute role="VENDOR">
            <VendorHomePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
];

export default router;
