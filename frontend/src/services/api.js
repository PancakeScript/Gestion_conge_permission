const BASE_URL = "http://localhost:3000/api";

const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const authApi = {
  login: async (credentials) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Erreur de connexion");
    return data;
  },

  register: async (userData) => {
    const res = await fetch(`${BASE_URL}/employes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Erreur d'inscription");
    return data;
  },
};

export const congeApi = {
  getSolde: async () => {
    const res = await fetch(`${BASE_URL}/conges/solde`, { headers: authHeaders() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  getMesDemandes: async () => {
    const res = await fetch(`${BASE_URL}/conges/mes-demandes`, { headers: authHeaders() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  getDashboard: async () => {
    const res = await fetch(`${BASE_URL}/conges/dashboard`, { headers: authHeaders() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  soumettreDemande: async (demandeData) => {
    const res = await fetch(`${BASE_URL}/conges`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(demandeData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },
};

export const employeApi = {
  getProfil: async (id) => {
    const res = await fetch(`${BASE_URL}/employes/${id}`, { headers: authHeaders() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  updateProfil: async (id, profilData) => {
    const res = await fetch(`${BASE_URL}/employes/${id}`, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify(profilData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  getAbsences: async () => {
    const res = await fetch(`${BASE_URL}/employes/absences`, { headers: authHeaders() });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Erreur");
    return data;
  },
};

export const managerApi = {
  getDemandesConge: async () => {
    const res = await fetch(`${BASE_URL}/manager/demandes-conge`, {
      headers: authHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Erreur");
    return data;
  },

  updateStatutConge: async (id, statut, commentaire) => {
    const res = await fetch(`${BASE_URL}/manager/demandes-conge/${id}/statut`, {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify({ statut, commentaire }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Erreur");
    return data;
  },

  getDemandesPermission: async () => {
    const res = await fetch(`${BASE_URL}/manager/demandes-permission`, {
      headers: authHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Erreur");
    return data;
  },

  updateStatutPermission: async (id, statut, commentaire) => {
    const res = await fetch(`${BASE_URL}/manager/demandes-permission/${id}/statut`, {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify({ statut, commentaire }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Erreur");
    return data;
  },

  getDashboard: async () => {
    const res = await fetch(`${BASE_URL}/manager/dashboard`, {
      headers: authHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Erreur");
    return data;
  },

  getPlanning: async () => {
    const res = await fetch(`${BASE_URL}/manager/planning`, {
      headers: authHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Erreur");
    return data;
  },
};
