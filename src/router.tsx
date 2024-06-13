import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import ProductGrid from "./components/ProductGrid";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/admin-pages/AdminDashboard";
import AdminLayout from "./components/admin-components/AdminLayout";
import AdminProducts from "./pages/admin-pages/AdminProducts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <ProductGrid /> },
      { path: "login", element: <Login /> }, 
      { path: "register", element: <Register /> },

      // ProtectedRoutes
      {
        element: <ProtectedRoute />,
        children: [],
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "", element: <AdminDashboard /> },
      { path: "products", element: <AdminProducts /> },
      // ProtectedRoutes
      {
        element: <ProtectedRoute />,
        children: [],
      },
    ],
  },
]);

export default router;
