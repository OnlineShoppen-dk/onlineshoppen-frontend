import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // refactor to use useAuth hook
  const isAuthhenticated = true;

  if (!isAuthhenticated) {
    return <Navigate to="/" />;
    //Implement LoginPage
    //return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
