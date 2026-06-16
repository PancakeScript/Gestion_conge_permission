import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRouteEmploye = () => {
  const { user } = useContext(AuthContext);
  if (!user || user.role !== "employe") {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRouteEmploye;
