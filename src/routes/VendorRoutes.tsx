import { Navigate, RouteObject } from "react-router-dom";

import VendorLayout from "../components/layouts/VendorLayout";
import VendorHomePage from "../pages/Vendor/VendorHomePage";

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
        element: <VendorHomePage />,
      },
    ],
  },
];

export default router;
