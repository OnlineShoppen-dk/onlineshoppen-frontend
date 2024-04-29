import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import App from "./App";
import Test from "./components/Test";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <App /> },

      // ProtectedRoutes
      {
        element: <ProtectedRoute />,
        children: [{ path: "/test", element: <Test /> }],
      },
    ],
  },
]);

export default router;
