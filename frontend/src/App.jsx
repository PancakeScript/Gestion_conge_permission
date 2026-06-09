import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRouteEmploye from "./components/ProtectedRouteEmploye";
import PublicRoute from "./components/PublicRoute";
import LoginEmploye from "./views/LoginEmploye";
import RegisterEmploye from "./views/RegisterEmploye";
import DashboardEmploye from "./views/DashboardEmploye";
import DemandeConge from "./views/DemandeConge";
import ProfilEmploye from "./views/ProfilEmploye";
import Politique from "./views/Politique";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Routes publiques — redirige vers dashboard si déjà connecté */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginEmploye />} />
            <Route path="/register" element={<RegisterEmploye />} />
          </Route>

          {/* Routes protégées */}
          <Route element={<ProtectedRouteEmploye />}>
            <Route path="/dashboard" element={<DashboardEmploye />} />
            <Route path="/demande-conge" element={<DemandeConge />} />
            <Route path="/profil" element={<ProfilEmploye />} />
            <Route path="/politique" element={<Politique />} />
          </Route>

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}