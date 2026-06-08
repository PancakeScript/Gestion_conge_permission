import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRouteEmploye from "./components/ProtectedRouteEmploye";
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
          <Route path="/login" element={<LoginEmploye />} />
          <Route path="/register" element={<RegisterEmploye />} />
          <Route element={<ProtectedRouteEmploye />}>
            <Route path="/dashboard" element={<DashboardEmploye />} />
            <Route path="/demande-conge" element={<DemandeConge />} />
            <Route path="/profil" element={<ProfilEmploye />} />
            <Route path="/politique" element={<Politique />} />
          </Route>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}