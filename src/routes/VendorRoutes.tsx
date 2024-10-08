import { Navigate, RouteObject } from "react-router-dom";

import VendorLayout from "../components/layouts/VendorLayout";
import VendorHomePage from "../pages/Vendor/VendorHomePage/VendorHomePage";
import ProtectedRoute from "../components/ProctectedRoute";
import VendorRestaurantPage from "../pages/Vendor/VendorRestaurantPage/VendorRestaurantPage";

export const ROUTE_VENDOR_ROOT = "vendor";
export const ROUTE_VENDOR_RESTAURANTS_ROOT = "restaurants";
export const ROUTE_RESTAURANT_ID_PARAM = "restaurantId";

export const ROUTE_VENDOR_RESTAURANTS_LIST_PAGE = `/${ROUTE_VENDOR_ROOT}/${ROUTE_VENDOR_RESTAURANTS_ROOT}`;
export const ROUTE_VENDOR_HOME = ROUTE_VENDOR_RESTAURANTS_LIST_PAGE;
export const ROUTE_VENDOR_RESTAURANT_PAGE = `${ROUTE_VENDOR_RESTAURANTS_LIST_PAGE}/:${ROUTE_RESTAURANT_ID_PARAM}`;
export const getVendorRestaurantPageRoute = (restaurantId: string) =>
  `${ROUTE_VENDOR_RESTAURANTS_LIST_PAGE}/${restaurantId}`;

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
    ],
  },
];

export default router;
