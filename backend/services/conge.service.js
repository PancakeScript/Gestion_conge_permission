const prisma = require("../config/database")

// Soumettre une demande de congé
const soumettreDemandeConge = async (id_employe, data) => {
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

  return prisma.demandes_conge.create({
    data: {
      id_employe,
      id_type_conge: typeConge.id_conge,
      motif,
      date_debut: new Date(date_debut),
      date_fin: new Date(date_fin),
      nombre_jours,
      statut_demandes_conge: "en_attente",
    },
  })
}

// Consulter le solde
const getSolde = async (id_employe, joursAnnuels = 30) => {
  const demandesApprouvees = await prisma.demandes_conge.findMany({
    where: { id_employe, statut_demandes_conge: "approuve" },
  })
  const joursPris = demandesApprouvees.reduce(
    (acc, d) => acc + (d.nombre_jours || 0), 0
  )
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

module.exports = { soumettreDemandeConge, getSolde, getMesDemandes, getDashboard }