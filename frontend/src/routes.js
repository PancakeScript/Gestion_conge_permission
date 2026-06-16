import Layout from "./shared/components/Layout";
import ProtectedRoute from "./shared/components/ProtectedRoute";

import LoginEmploye from "./modules/auth/pages/LoginEmploye";
import RegisterEmploye from "./modules/auth/pages/RegisterEmploye";
import LoginManager from "./modules/auth/pages/LoginManager";
import RegisterManager from "./modules/auth/pages/RegisterManager";
import LoginRH from "./modules/auth/pages/LoginRH";
import RegisterRH from "./modules/auth/pages/RegisterRH";

import DashboardEmploye from "./modules/employe/pages/DashboardEmploye";
import DemandeConge from "./modules/employe/pages/DemandeConge";
import ProfilEmploye from "./modules/employe/pages/ProfilEmploye";
import Politique from "./modules/employe/pages/Politique";
import NotificationsEmploye from "./modules/employe/pages/NotificationsEmploye";

import DashboardManager from "./modules/manager/pages/DashboardManager";
import PlanningManager from "./modules/manager/pages/PlanningManager";

import DashboardRH from "./modules/rh/pages/DashboardRH";
import DemandesRH from "./modules/rh/pages/Demandes";
import EmployesRH from "./modules/rh/pages/Employes";
import FeriesRH from "./modules/rh/pages/Feries";
import TypesCongeRH from "./modules/rh/pages/TypesConge";

import React from "react";

const publicRoutes = [
  { path: "/login", element: React.createElement(LoginEmploye) },
  { path: "/login-manager", element: React.createElement(LoginManager) },
  { path: "/login-rh", element: React.createElement(LoginRH) },
  { path: "/register-rh", element: React.createElement(RegisterRH) },
  { path: "/register", element: React.createElement(RegisterEmploye) },
  { path: "/register-manager", element: React.createElement(RegisterManager) },
];

const protectedRoutes = {
  path: "/",
  element: React.createElement(Layout),
  children: [
    {
      path: "",
      element: React.createElement(ProtectedRoute, { roles: ["employe"] }),
      children: [
        { path: "dashboard", element: React.createElement(DashboardEmploye) },
        { path: "demande-conge", element: React.createElement(DemandeConge) },
        { path: "profil", element: React.createElement(ProfilEmploye) },
        { path: "politique", element: React.createElement(Politique) },
        { path: "notifications", element: React.createElement(NotificationsEmploye) },
      ],
    },
    {
      path: "manager",
      element: React.createElement(ProtectedRoute, { roles: ["manager"] }),
      children: [
        { path: "dashboard", element: React.createElement(DashboardManager) },
        { path: "planning", element: React.createElement(PlanningManager) },
      ],
    },
    {
      path: "rh",
      element: React.createElement(ProtectedRoute, { roles: ["rh"] }),
      children: [
        { path: "dashboard", element: React.createElement(DashboardRH) },
        { path: "demandes", element: React.createElement(DemandesRH) },
        { path: "employes", element: React.createElement(EmployesRH) },
        { path: "feries", element: React.createElement(FeriesRH) },
        { path: "types-conge", element: React.createElement(TypesCongeRH) },
      ],
    },
  ],
};

export { publicRoutes, protectedRoutes };
