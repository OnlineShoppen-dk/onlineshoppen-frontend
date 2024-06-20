import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminDashboard from "./admin-page/AdminDashboard";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import HomePage from "./pages/HomePage";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "products/:productId", element: <ProductDetailsPage /> },
      { path: "about", element: <AboutUs /> },
      { path: "contact", element: <Contact /> },

      // ProtectedRoutes
      {
        element: <ProtectedRoute />,
        children: [],
      },
    ],
  },
  {
    path: "/admin",
    // element: <Layout />,
    children: [
      { path: "", element: <AdminDashboard /> },
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
