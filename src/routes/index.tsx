import { createBrowserRouter } from "react-router-dom";

import RootLayout from "../components/layouts/RootLayout";
import ErrorPage from "../pages/common/ErrorPage";
import CommonLoginPage from "../pages/CommonLoginPage";
import PageNotFound from "../pages/common/PageNotFound";
import vendorRouter from "./VendorRoutes";
import adminRouter from "./AdminRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <CommonLoginPage />,
      },
      ...vendorRouter,
      ...adminRouter,
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default router;
