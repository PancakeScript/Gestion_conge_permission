import { api } from "./client";

export const typesCongeApi = {
  getAll: async () => {
    return api.get("/types-conge");
  },
  create: async (data) => {
    return api.post("/types-conge", data);
  },
  update: async (id, data) => {
    return api.put(`/types-conge/${id}`, data);
  },
  delete: async (id) => {
    return api.delete(`/types-conge/${id}`);
  },
  toggleStatut: async (id) => {
    return api.patch(`/types-conge/${id}/toggle`, {});
  },
};
