import { api } from "./client";

export const employesApi = {
  getAll: async () => {
    return api.get("/employes");
  },
  delete: async (id) => {
    return api.delete(`/employes/${id}`);
  },
};
