import { api } from "./client";

export const authApi = {
  login: (payload: { mail; mdp }) =>
    api.post("/auth/login", payload).then(r => r.data),

  register: (payload: {
    nom_utilisateur;
    prenom;
    mail;
    mdp;
    role;
  }) => api.post("/auth/register", payload).then(r => r.data),

  getMe: () => api.get("/auth/me").then(r => r.data),
};