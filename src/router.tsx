import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import ProductGrid from "./components/ProductGrid";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <ProductGrid /> },

      // ProtectedRoutes
      {
        element: <ProtectedRoute />,
        children: [],
      },
    ],
  },
]);

export default router;
