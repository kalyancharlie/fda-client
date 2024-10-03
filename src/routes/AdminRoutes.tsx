import { Navigate, RouteObject } from "react-router-dom";

import AdminLayout from "../components/layouts/AdminLayout";
import AdminHomePage from "../pages/Admin/AdminHomePage";

const router: RouteObject[] = [
  {
    path: "admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="home" replace />,
      },
      {
        path: "home",
        element: <AdminHomePage />,
      },
    ],
  },
];

export default router;
