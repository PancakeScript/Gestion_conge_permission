import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRouteRH = () => {
  const { user } = useContext(AuthContext);
  if (!user || user.role !== "rh") {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRouteRH;
