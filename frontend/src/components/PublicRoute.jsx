import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PublicRoute() {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated) {
    // Redirige vers le bon dashboard selon le rôle
    const dest = user?.role === "manager" ? "/manager/dashboard" : "/dashboard";
    return <Navigate to={dest} replace />;
  }

  return <Outlet />;
}