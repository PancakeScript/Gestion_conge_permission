import { api } from "./client";

export interface Employe {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse: string;
  statut: string;
  dept: string;
  jours_acquis: number;
  id_departement?: number;
}

export const employesApi = {
  getAll: async () => {
    const response = await api.get<Employe[]>("/employes");
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/employes/${id}`);
    return response.data;
  },
};