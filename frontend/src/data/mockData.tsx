export const STATS = [
  { label: "Demandes en attente", value: 12, icon: "clock", color: "#d4af64", bg: "#fdf6e3" },
  { label: "Approuvées ce mois", value: 34, icon: "check", color: "#27ae60", bg: "#f0faf4" },
  { label: "Refusées ce mois",   value: 5,  icon: "x",     color: "#e74c3c", bg: "#fef5f5" },
  { label: "Employés actifs",    value: 87, icon: "users",  color: "#3b82f6", bg: "#eff6ff" },
];

export const DEMANDES = [
  { id: 1, nom: "Marie Dupont",    dept: "Informatique",   type: "Annuel",       debut: "10/06/2024", fin: "20/06/2024", jours: 10, statut: "approuve_manager" },
  { id: 2, nom: "Jean Martin",     dept: "Comptabilité",   type: "Maladie",      debut: "05/06/2024", fin: "07/06/2024", jours: 3,  statut: "approuve_manager" },
  { id: 3, nom: "Sophie Rakoto",   dept: "Marketing",      type: "Exceptionnel", debut: "12/06/2024", fin: "13/06/2024", jours: 2,  statut: "en_attente" },
  { id: 4, nom: "Paul Rabe",       dept: "Commercial",     type: "Sans solde",   debut: "15/06/2024", fin: "25/06/2024", jours: 10, statut: "approuve_manager" },
  { id: 5, nom: "Clara Rasoamana", dept: "Direction",      type: "Maternité",    debut: "01/07/2024", fin: "30/09/2024", jours: 91, statut: "en_attente" },
  { id: 6, nom: "Luc Andria",      dept: "Informatique",   type: "Annuel",       debut: "01/06/2024", fin: "05/06/2024", jours: 5,  statut: "refuse" },
];

export const ABSENCES_DEPT = [
  { dept: "Informatique",    total: 12 },
  { dept: "Comptabilité",    total: 8  },
  { dept: "Marketing",       total: 6  },
  { dept: "RH",              total: 3  },
  { dept: "Direction",       total: 2  },
  { dept: "Commercial",      total: 9  },
];

export const TOP_CONGES = [
  { type: "Annuel",       count: 28, color: "#d4af64" },
  { type: "Maladie",      count: 15, color: "#3b82f6" },
  { type: "Exceptionnel", count: 9,  color: "#a78bfa" },
  { type: "Maternité",    count: 5,  color: "#f472b6" },
  { type: "Sans solde",   count: 3,  color: "#94a3b8" },
];

export const NAV_ITEMS = [
  { key: "dashboard",    label: "Dashboard" },
  { key: "employes",     label: "Employés" },
  { key: "demandes",     label: "Demandes" },
  { key: "types",        label: "Types de congé" },
  { key: "feries",       label: "Jours fériés" },
  { key: "notifications",label: "Notifications" },
];

export const EMPLOYES_INIT = [
  { id: 1, nom: "Marie Dupont", prenom: "Marie", dept: "Informatique", telephone: "034 00 111 22", adresse: "Antananarivo", statut: "actif", email: "marie@company.mg" },
  { id: 2, nom: "Jean Martin", prenom: "Jean", dept: "Comptabilité", telephone: "033 00 222 33", adresse: "Fianarantsoa", statut: "actif", email: "jean@company.mg" },
  { id: 3, nom: "Sophie Rakoto", prenom: "Sophie", dept: "Marketing", telephone: "032 00 333 44", adresse: "Toamasina", statut: "inactif", email: "sophie@company.mg" },
  { id: 4, nom: "Paul Rabe", prenom: "Paul", dept: "Commercial", telephone: "034 00 444 55", adresse: "Mahajanga", statut: "actif", email: "paul@company.mg" },
  { id: 5, nom: "Clara Rasoamana", prenom: "Clara", dept: "Direction", telephone: "033 00 555 66", adresse: "Antananarivo", statut: "actif", email: "clara@company.mg" },
];

export const TYPES_CONGE_INIT = [
  { id: 1, nom: "Congé annuel", duree: 30, statut: "actif" },
  { id: 2, nom: "Congé maladie", duree: 15, statut: "actif" },
  { id: 3, nom: "Congé maternité", duree: 98, statut: "actif" },
  { id: 4, nom: "Congé sans solde", duree: 10, statut: "inactif" },
  { id: 5, nom: "Congé exceptionnel", duree: 5, statut: "actif" },
];

export const FERIES_INIT = [
  { id: 1, nom: "Jour de l'An", date: "2024-01-01" },
  { id: 2, nom: "Fête du Travail", date: "2024-05-01" },
  { id: 3, nom: "Fête Nationale", date: "2024-06-26" },
  { id: 4, nom: "Noël", date: "2024-12-25" },
  { id: 5, nom: "Assomption", date: "2024-08-15" },
];

export const NOTIFS_INIT = [
  { id: 1, destinataire: "Marie Dupont", message: "Votre congé annuel a été approuvé.", date: "2024-06-01", statut: "lu" },
  { id: 2, destinataire: "Jean Martin", message: "Votre demande est en cours de traitement.", date: "2024-06-02", statut: "non_lu" },
  { id: 3, destinataire: "Tous les employés", message: "Le 26 Juin est férié.", date: "2024-06-10", statut: "lu" },
];