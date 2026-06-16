import { api } from "./client";

export interface Notification {
  id_notification: number;
  titre: string;
  message: string;
  type: string;
  lu: boolean;
  date_creation: string;
  id_reference: number | null;
}

export const notificationsApi = {
  // Récupérer mes notifications
  getMesNotifications: (nonLuesSeulement?: boolean) =>
    api.get<Notification[]>("/notifications", { 
      params: { nonLuesSeulement } 
    }),

  // Compter les notifications non lues
  countNonLues: () =>
    api.get<{ count: number }>("/notifications/non-lues/count"),

  // Marquer une notification comme lue
  marquerLue: (id: number) =>
    api.put(`/notifications/${id}/lire`),
};