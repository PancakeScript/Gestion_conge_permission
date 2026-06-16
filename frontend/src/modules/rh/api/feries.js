import { api } from "./client";

export const feriesApi = {
  getAll: async () => {
    return api.get("/feries");
  },
  create: async (data) => {
    return api.post("/feries", data);
  },
  update: async (id, data) => {
    return api.put(`/feries/${id}`, data);
  },
  delete: async (id) => {
    return api.delete(`/feries/${id}`);
  },
};
