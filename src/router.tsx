import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import ProductGrid from "./components/ProductGrid";
import Register from "./pages/Register";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <ProductGrid /> },
      { path: "register", element: <Register /> }, 
      { path: "login", element: <Login /> }, 
      // ProtectedRoutes
      {
        element: <ProtectedRoute />,
        children: [],
      },
    ],
  },
]);

export default router;
