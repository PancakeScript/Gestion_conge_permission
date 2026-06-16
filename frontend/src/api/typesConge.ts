import { api } from "./client";

export interface TypeConge {
  id: number;
  nom: string;
  duree: number | null;
  statut: string;
}

export const typesCongeApi = {
  getAll: async () => {
    const response = await api.get<TypeConge[]>("/types-conge");
    return response.data;
  },

  create: async (data: { nom: string; duree?: number; statut?: string }) => {
    const response = await api.post<TypeConge>("/types-conge", data);
    return response.data;
  },

  update: async (id: number, data: { nom?: string; duree?: number; statut?: string }) => {
    const response = await api.put<TypeConge>(`/types-conge/${id}`, data);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await api.delete(`/types-conge/${id}`);
    return response.data;
  },

  toggleStatut: async (id: number) => {
    const response = await api.patch<TypeConge>(`/types-conge/${id}/toggle`, {});
    return response.data;
  },
};