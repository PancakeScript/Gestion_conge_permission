import { api } from "./client";

export const authApi = {
  login: (payload: { mail: string; mdp: string }) =>
    api.post("/auth/login", payload).then(r => r.data),

  register: (payload: {
    nom_utilisateur: string;
    prenom: string;
    mail: string;
    mdp: string;
    role: string;
  }) => api.post("/auth/register", payload).then(r => r.data),

  getMe: () => api.get("/auth/me").then(r => r.data),
};