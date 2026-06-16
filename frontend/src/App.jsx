import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRouteEmploye from "./components/ProtectedRouteEmploye";
import ProtectedRouteManager from "./components/ProtectedRouteManager";
import PublicRoute from "./components/PublicRoute";
import Layout from "./components/Layout";
import LoginEmploye from "./views/LoginEmploye";
import LoginManager from "./views/LoginManager";
import RegisterEmploye from "./views/RegisterEmploye";
import RegisterManager from "./views/RegisterManager";
import DashboardEmploye from "./views/DashboardEmploye";
import DemandeConge from "./views/DemandeConge";
import ProfilEmploye from "./views/ProfilEmploye";
import Politique from "./views/Politique";
import NotificationsEmploye from "./views/NotificationsEmploye";
import DashboardManager from "./views/DashboardManager";
import PlanningManager from "./views/PlanningManager";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* ── Racine → redirige selon le contexte ── */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* ── Routes publiques (accessibles seulement si NON connecté) ── */}
          <Route element={<PublicRoute />}>
            <Route path="/login"            element={<LoginEmploye />} />
            <Route path="/login-manager"    element={<LoginManager />} />
            <Route path="/register"         element={<RegisterEmploye />} />
            <Route path="/register-manager" element={<RegisterManager />} />
          </Route>

          {/* ── Routes protégées avec Layout ── */}
          <Route element={<Layout />}>

            <Route element={<ProtectedRouteEmploye />}>
              <Route path="/dashboard"     element={<DashboardEmploye />} />
              <Route path="/demande-conge" element={<DemandeConge />} />
              <Route path="/profil"        element={<ProfilEmploye />} />
              <Route path="/politique"     element={<Politique />} />
              <Route path="/notifications" element={<NotificationsEmploye />} />
            </Route>

            <Route element={<ProtectedRouteManager />}>
              <Route path="/manager/dashboard" element={<DashboardManager />} />
              <Route path="/manager/planning"  element={<PlanningManager />} />
            </Route>

          </Route>

          {/* ── Fallback ── */}
          <Route path="*" element={<Navigate to="/login" replace />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}