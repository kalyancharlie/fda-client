import { Navigate, RouteObject } from "react-router-dom";

import AdminLayout from "../components/layouts/AdminLayout";
import ProtectedRoute from "../components/ProctectedRoute";
import {
  ROUTE_ADMIN_MANAGE_ACCOUNTS_PAGE,
  ROUTE_ADMIN_ORDERS_PAGE,
  ROUTE_ADMIN_ORDERS_ROOT,
  ROUTE_ADMIN_RESTAURANT_PAGE,
} from "./route-constants";
import AdminManageAccountsPage from "../pages/Admin/AdminManageAccountsPage/AdminManageAccountsPage";
import AdminOrdersPage from "../pages/Admin/AdminOrdersPage/AdminOrdersPage";
import AdminRestaurantPage from "../pages/Admin/AdminRestaurantsPage/AdminRestaurant";

const router: RouteObject[] = [
  {
    path: "admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTE_ADMIN_ORDERS_ROOT} replace />,
      },
      {
        path: ROUTE_ADMIN_ORDERS_ROOT,
        element: (
          <ProtectedRoute role="ADMIN">
            <AdminOrdersPage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTE_ADMIN_MANAGE_ACCOUNTS_PAGE,
        element: (
          <ProtectedRoute role="ADMIN">
            <AdminManageAccountsPage />,
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTE_ADMIN_ORDERS_PAGE,
        element: (
          <ProtectedRoute role="ADMIN">
            <AdminOrdersPage />,
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTE_ADMIN_RESTAURANT_PAGE,
        element: (
          <ProtectedRoute role="ADMIN">
            <AdminRestaurantPage />,
          </ProtectedRoute>
        ),
      },
    ],
  },
];

export default router;
