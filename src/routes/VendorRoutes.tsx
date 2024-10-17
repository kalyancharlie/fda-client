import { Navigate, RouteObject } from "react-router-dom";

import VendorLayout from "../components/layouts/VendorLayout";
import VendorHomePage from "../pages/Vendor/VendorHomePage/VendorHomePage";
import ProtectedRoute from "../components/ProctectedRoute";
import VendorRestaurantPage from "../pages/Vendor/VendorRestaurantPage/VendorRestaurantPage";
import {
  ROUTE_VENDOR_ORDERS_PAGE,
  ROUTE_VENDOR_RESTAURANT_PAGE,
  ROUTE_VENDOR_RESTAURANTS_ROOT,
} from "./route-constants";
import VendorOrdersPage from "../pages/Vendor/VendorOrdersPage/VendorOrdersPage";

const router: RouteObject[] = [
  {
    path: "vendor",
    element: <VendorLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTE_VENDOR_RESTAURANTS_ROOT} replace />,
      },
      {
        path: ROUTE_VENDOR_RESTAURANTS_ROOT,
        element: (
          <ProtectedRoute role="VENDOR">
            <VendorHomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTE_VENDOR_RESTAURANT_PAGE,
        element: (
          <ProtectedRoute role="VENDOR">
            <VendorRestaurantPage />,
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTE_VENDOR_ORDERS_PAGE,
        element: (
          <ProtectedRoute role="VENDOR">
            <VendorOrdersPage />,
          </ProtectedRoute>
        ),
      },
    ],
  },
];

export default router;
