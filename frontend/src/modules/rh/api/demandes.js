import { api } from "./client";

export const demandesApi = {
  getAll: async (statut) => {
    const query = statut && statut !== "tous" ? `?statut=${statut}` : "";
    return api.get(`/demandes${query}`);
  },
  approuverRH: async (id, commentaire) => {
    return api.patch(`/demandes/${id}/approuver-rh`, { commentaire });
  },
  refuser: async (id, commentaire) => {
    return api.patch(`/demandes/${id}/refuser`, { commentaire });
  },
};
