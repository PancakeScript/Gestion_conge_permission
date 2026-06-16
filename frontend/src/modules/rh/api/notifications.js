import { api } from "./client";


export const notificationsApi = {
  // Récupérer mes notifications
  getMesNotifications: (nonLuesSeulement?) =>
    api.get("/notifications", { 
      params: { nonLuesSeulement } 
    }),

  // Compter les notifications non lues
  countNonLues: () =>
    api.get<{ count }>("/notifications/non-lues/count"),

  // Marquer une notification comme lue
  marquerLue: (id) =>
    api.put(`/notifications/${id}/lire`),
};