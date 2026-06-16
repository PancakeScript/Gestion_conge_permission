import { api } from "./client";

export interface JourFerie {
  id: number;
  nom: string;
  date: string;
}

export const feriesApi = {
  getAll: async () => {
    const response = await api.get<JourFerie[]>("/feries");
    return response.data;
  },

  create: async (data: { nom: string; date: string }) => {
    const response = await api.post<JourFerie>("/feries", data);
    return response.data;
  },

  update: async (id: number, data: { nom?: string; date?: string }) => {
    const response = await api.put<JourFerie>(`/feries/${id}`, data);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await api.delete(`/feries/${id}`);
    return response.data;
  },
};