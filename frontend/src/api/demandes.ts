import { api } from "./client";

export interface DemandeConge {
  id: number;
  nom: string;
  dept: string;
  type: string;
  debut: string;
  fin: string;
  jours: number;
  statut: string;
  motif?: string;
  commentaire_manager?: string;
  commentaire_rh?: string;
  date_demande: string;
  id_employe: number;
}

export const demandesApi = {
  getAll: async (statut?: string) => {
    const query = statut && statut !== "tous" ? `?statut=${statut}` : "";
    const response = await api.get<DemandeConge[]>(`/demandes${query}`);
    return response.data;
  },

  approuverRH: async (id: number, commentaire?: string) => {
    const response = await api.patch(`/demandes/${id}/approuver-rh`, { commentaire });
    return response.data;
  },

  refuser: async (id: number, commentaire?: string) => {
    const response = await api.patch(`/demandes/${id}/refuser`, { commentaire });
    return response.data;
  },
};