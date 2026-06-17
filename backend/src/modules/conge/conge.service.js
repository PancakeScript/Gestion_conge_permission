const prisma = require("../../shared/config/database");

// Soumettre une demande de congé
const soumettreDemandeConge = async (id_employe, data, fichier) => {
  const { id_type_conge, date_debut, date_fin, motif } = data;

  if (!id_type_conge || !date_debut || !date_fin) {
    throw new Error("Type de congé, date début et date fin sont obligatoires");
  }

  // Trouver le type par ID
  const typeConge = await prisma.types_conge.findUnique({
    where: { id_conge: parseInt(id_type_conge) },
  });
  if (!typeConge) throw new Error("Type de congé introuvable");

  // Calculer les jours ouvrés
  const calculerJoursOuvres = (debut, fin) => {
    let count = 0;
    const cur = new Date(debut);
    const end = new Date(fin);
    while (cur <= end) {
      const jour = cur.getDay();
      if (jour !== 0 && jour !== 6) count++;
      cur.setDate(cur.getDate() + 1);
    }
    return count;
  };

  const nombre_jours = calculerJoursOuvres(date_debut, date_fin);
  if (nombre_jours <= 0) throw new Error("Les dates sont invalides");

  // Vérifier le solde sauf pour Congé Sans Solde
  const nomLower = typeConge.nom_types_conge.toLowerCase();
  if (nomLower !== "congé sans solde" && nomLower !== "congé sans solde") {
    const solde = await getSolde(id_employe);
    if (solde.soldeRestant < nombre_jours) {
      throw new Error(`Solde insuffisant. Il vous reste ${solde.soldeRestant} jours`);
    }
  }

  // Chemin du justificatif (relatif pour l'URL publique)
  let justificatifPdf = null;
  if (fichier) {
    justificatifPdf = "justificatifs/" + fichier.filename;
  }

  const demande = await prisma.demandes_conge.create({
    data: {
      id_employe: parseInt(id_employe),
      id_type_conge: typeConge.id_conge,
      motif: motif || null,
      date_debut: new Date(date_debut),
      date_fin: new Date(date_fin),
      nombre_jours,
      justificatif_pdf: justificatifPdf,
      statut_demandes_conge: "en_attente",
    },
    include: { types_conge: true },
  });

  // Notifier le manager (try/catch pour ne pas bloquer)
  try {
    const employe = await prisma.employe.findUnique({
      where: { id_employe: parseInt(id_employe) },
      include: { departement: true },
    });

    if (employe?.id_departement) {
      const dept = await prisma.departement.findUnique({
        where: { id_departement: employe.id_departement },
        include: { manager_departement_id_managerTomanager: true },
      });
      const manager = dept?.manager_departement_id_managerTomanager;
      if (manager?.id_utilisateur) {
        const dateDebut = new Date(date_debut).toLocaleDateString('fr-FR');
        const dateFin = new Date(date_fin).toLocaleDateString('fr-FR');
        await prisma.notification.create({
          data: {
            id_utilisateur: manager.id_utilisateur,
            message: `Nouvelle demande de ${typeConge.nom_types_conge} de ${employe.prenom_employe} ${employe.nom_employe} (${dateDebut} → ${dateFin})`,
            statut_notification: "non_lue",
          },
        });
      }
    }
  } catch (err) {
    console.error("Erreur notification manager:", err.message);
  }

  return demande;
};

// Annuler une demande
const annulerDemande = async (id_demande, id_employe) => {
  const demande = await prisma.demandes_conge.findFirst({
    where: {
      id_demande_conde: parseInt(id_demande),
      id_employe: parseInt(id_employe)
    }
  });
  if (!demande) throw new Error("Demande introuvable");
  if (demande.statut_demandes_conge !== "en_attente")
    throw new Error("Cette demande ne peut plus être annulée");

  return prisma.demandes_conge.delete({
    where: { id_demande_conde: parseInt(id_demande) }
  });
};

// Solde
const getSolde = async (id_employe, joursAnnuels = 30) => {
  const debutAnnee = new Date(new Date().getFullYear(), 0, 1);
  const demandesApprouvees = await prisma.demandes_conge.findMany({
    where: {
      id_employe: parseInt(id_employe),
      statut_demandes_conge: { in: ["approuve", "approuve_rh"] },
      date_debut: { gte: debutAnnee },
    },
  });
  const joursPris = demandesApprouvees.reduce((acc, d) => acc + (d.nombre_jours || 0), 0);
  return { joursAnnuels, joursPris, soldeRestant: joursAnnuels - joursPris };
};

// Mes demandes
const getMesDemandes = async (id_employe) => {
  return prisma.demandes_conge.findMany({
    where: { id_employe: parseInt(id_employe) },
    include: { types_conge: true },
    orderBy: { date_demande: "desc" },
  });
};

// Dashboard
const getDashboard = async (id_employe) => {
  const [solde, demandes] = await Promise.all([
    getSolde(id_employe),
    getMesDemandes(id_employe),
  ]);
  return { solde, demandes };
};

module.exports = { soumettreDemandeConge, getSolde, getMesDemandes, getDashboard, annulerDemande };
