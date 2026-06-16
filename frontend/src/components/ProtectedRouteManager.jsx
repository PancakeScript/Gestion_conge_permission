import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRouteManager = () => {
  const { user } = useContext(AuthContext);
  if (!user || user.role !== "manager") {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRouteManager;
