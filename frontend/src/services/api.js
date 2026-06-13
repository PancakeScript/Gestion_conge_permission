const BASE_URL = "http://localhost:3000/api";

const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

const refreshTokenIfNeeded = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  
  // Vérifie si expire dans moins de 2 minutes
  const payload = JSON.parse(atob(token.split(".")[1]));
  const expiresIn = payload.exp * 1000 - Date.now();
  
  if (expiresIn < 2 * 60 * 1000) {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) return token;
    try {
      const res = await fetch(`${BASE_URL}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        return data.token;
      }
    } catch {}
  }
  return token;
};


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
    localStorage.setItem("refreshToken", data.refreshToken); 
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

  getJoursFeries: async () => {
  const res = await fetch(`${BASE_URL}/conges/jours-feries`, { headers: authHeaders() });
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

  getNotifications: async () => {
  const res = await fetch(`${BASE_URL}/conges/notifications`, { headers: authHeaders() });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
},

marquerNotifLue: async (id) => {
  const res = await fetch(`${BASE_URL}/conges/notifications/${id}/lue`, {
    method: "PUT",
    headers: authHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
},

marquerToutesLues: async () => {
  const res = await fetch(`${BASE_URL}/conges/notifications/toutes-lues`, {
    method: "PUT",
    headers: authHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
},
soumettreDemande: async (demandeData, fichier) => {

  const formData = new FormData();

  Object.keys(demandeData).forEach(key => {
    formData.append(key, demandeData[key]);
  });

  if (fichier) {
    formData.append("justificatif", fichier);
  }

  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/conges`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error);
  }

  return data;
},

annulerDemande: async (id) => {
  const res = await fetch(`${BASE_URL}/conges/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
},

};

export const employeApi = {
getProfil: async () => {
  const res = await fetch(`${BASE_URL}/employes/moi`, { headers: authHeaders() });
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
};