const prisma = require("../../shared/config/database")

// Soumettre une demande de congé
const soumettreDemandeConge = async (id_employe, data, fichier) => {
  const { nom_types_conge, motif, date_debut, date_fin } = data

  // Trouver le type par nom
  const typeConge = await prisma.types_conge.findFirst({
    where: { nom_types_conge },
  })
  if (!typeConge) throw new Error(`Type de congé "${nom_types_conge}" introuvable`)

  // Calculer le nombre de jours
  const debut = new Date(date_debut)
  const fin = new Date(date_fin)
  const nombre_jours = Math.ceil((fin - debut) / (1000 * 60 * 60 * 24)) + 1
  if (nombre_jours <= 0) throw new Error("Les dates sont invalides")

  // Vérifier le solde sauf pour Congé Sans Solde
  if (typeConge.nom_types_conge !== "Congé Sans Solde") {
    const solde = await getSolde(id_employe)
    if (solde.soldeRestant < nombre_jours) {
      throw new Error(`Solde insuffisant. Il vous reste ${solde.soldeRestant} jours`)
    }
  }

  let justificatifPdf = null;

if (fichier) {
  justificatifPdf = fichier.filename;
}

  // Récupérer l'employé pour connaître son département
  const employe = await prisma.employe.findUnique({
    where: { id_employe },
    include: { departement: true },
  });

  const demande = await prisma.demandes_conge.create({
    data: {
      id_employe,
      id_type_conge: typeConge.id_conge,
      motif,
      date_debut: new Date(date_debut),
      date_fin: new Date(date_fin),
      nombre_jours,
      justificatif_pdf: justificatifPdf,
      statut_demandes_conge: "en_attente",
    },
    include: { types_conge: true },
  });

  // Notifier le manager du département
  if (employe?.id_departement) {
    const dept = await prisma.departement.findUnique({
      where: { id_departement: employe.id_departement },
      include: { manager_departement_id_managerTomanager: true },
    });
    const manager = dept?.manager_departement_id_managerTomanager;
    if (manager?.id_utilisateur) {
      const dateDebut = new Date(date_debut).toLocaleDateString('fr-FR');
      const dateFin   = new Date(date_fin).toLocaleDateString('fr-FR');
      await prisma.notification.create({
        data: {
          id_utilisateur: manager.id_utilisateur,
          message: `Nouvelle demande de congé de ${employe.prenom_employe} ${employe.nom_employe} — ${typeConge.nom_types_conge} du ${dateDebut} au ${dateFin}`,
          statut_notification: "non_lu",
        },
      });
    }
  }

  return demande;
}

//annuler une demande de congé
const annulerDemande = async (id_demande, id_employe) => {

  const demande = await prisma.demandes_conge.findFirst({
    where: {
      id_demande_conde: id_demande,
      id_employe
    }
  })

  if (!demande)
    throw new Error("Demande introuvable")

  if (demande.statut_demandes_conge !== "en_attente")
    throw new Error("Cette demande ne peut plus être annulée")

  return prisma.demandes_conge.update({
    where: {
      id_demande_conde: id_demande
    },
    data: {
      statut_demandes_conge: "annule"
    }
  })
}

// Consulter le solde
const getSolde = async (id_employe, joursAnnuels = 30) => {
  const debutAnnee = new Date(new Date().getFullYear(), 0, 1);
  const demandesApprouvees = await prisma.demandes_conge.findMany({
    where: {
      id_employe,
      statut_demandes_conge: "approuve",
      date_debut: { gte: debutAnnee }, // ← filtre par année courante
    },
  })
  const joursPris = demandesApprouvees.reduce((acc, d) => acc + (d.nombre_jours || 0), 0)
  return { joursAnnuels, joursPris, soldeRestant: joursAnnuels - joursPris }
}

// Lister les demandes d'un employé
const getMesDemandes = async (id_employe) => {
  return prisma.demandes_conge.findMany({
    where: { id_employe },
    include: { types_conge: true },
    orderBy: { date_demande: "desc" },
  })
}

// Dashboard complet
const getDashboard = async (id_employe) => {
  const [solde, demandes] = await Promise.all([
    getSolde(id_employe),
    getMesDemandes(id_employe),
  ])
  return { solde, demandes }
}

module.exports = { soumettreDemandeConge, getSolde, getMesDemandes, getDashboard, annulerDemande }