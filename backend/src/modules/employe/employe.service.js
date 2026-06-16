const prisma = require("../../shared/config/database")

const creerEmploye = async (data) => {
  const bcrypt = require("bcrypt")
  const {
    nom_utilisateur,
    prenom,
    mail,
    mdp,
    telephone_employe,
    adresse_employe,
    nom_departement,
  } = data

  const mdpHash = await bcrypt.hash(mdp, 10)

  // Trouver ou créer le département
  let departement = await prisma.departement.findFirst({
    where: { nom_departement },
  })
  if (!departement) {
    departement = await prisma.departement.create({
      data: { nom_departement },
    })
  }

  // Créer l'utilisateur
  const utilisateur = await prisma.utilisateur.create({
    data: { nom_utilisateur, prenom, mail, mdp: mdpHash },
  })

  // Créer l'employé
  const employe = await prisma.employe.create({
    data: {
      nom_employe: nom_utilisateur,
      prenom_employe: prenom,
      telephone_employe,
      adresse_employe,
      statut_employe: "actif",
      id_departement: departement.id_departement,
      id_utilisateur: utilisateur.id_utilisateur,
    },
  })

  return employe
}

// Modifier les infos d'un employé
const modifierEmploye = async (id, data) => {
  return prisma.employe.update({
    where: { id_employe: parseInt(id) },
    data,
  })
}

// Consulter le profil
const getEmploye = async (id) => {
  return prisma.employe.findUnique({
    where: { id_employe: parseInt(id) },
    include: { departement: true, utilisateur: true },
  })
}

// Solde de congés (jours acquis - jours pris)
const getSolde = async (id, joursAnnuels = 30) => {
  const demandesApprouvees = await prisma.demandes_conge.findMany({
    where: { id_employe: id, statut_demandes_conge: "approuve" },
  })
  const joursPris = demandesApprouvees.reduce(
    (acc, d) => acc + (d.nombre_jours || 0), 0
  )
  return { joursAnnuels, joursPris, soldeRestant: joursAnnuels - joursPris }
}

// Liste des demandes de l'employé
const getMesDemandes = async (id) => {
  return prisma.demandes_conge.findMany({
    where: { id_employe: id },
    orderBy: { date_demande: "desc" },
  })
}

module.exports = { creerEmploye, modifierEmploye, getEmploye, getSolde, getMesDemandes }