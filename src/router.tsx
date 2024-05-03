import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import ProductGrid from "./components/ProductGrid";
import Register from "./components/Register";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <Layout />,
    children: [
      { path: "", element: <ProductGrid /> },
      { path: "register", element: <Register /> }, 

      // ProtectedRoutes
      {
        element: <ProtectedRoute />,
        children: [],
      },
    ],
  },
]);

export default router;
