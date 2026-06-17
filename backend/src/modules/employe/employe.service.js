const prisma = require("../../shared/config/database");

const creerEmploye = async (data) => {
  const bcrypt = require("bcrypt");
  const { nom_utilisateur, prenom, mail, mdp, telephone_employe, adresse_employe, nom_departement } = data;
  const mdpHash = await bcrypt.hash(mdp, 10);

  let departement = await prisma.departement.findFirst({ where: { nom_departement } });
  if (!departement) departement = await prisma.departement.create({ data: { nom_departement } });

  const utilisateur = await prisma.utilisateur.create({
    data: { nom_utilisateur, prenom, mail, mdp: mdpHash }
  });

  const employe = await prisma.employe.create({
    data: {
      nom_employe: nom_utilisateur,
      prenom_employe: prenom,
      telephone_employe,
      adresse_employe,
      statut_employe: "actif",
      id_departement: departement.id_departement,
      id_utilisateur: utilisateur.id_utilisateur
    }
  });

  return employe;
};

// Modifier les infos d'un employé
const modifierEmploye = async (id, data) => {
  const idNum = parseInt(id);
  if (isNaN(idNum)) throw new Error("ID employé invalide");

  const updateData = {};
  if (data.telephone_employe !== undefined) updateData.telephone_employe = data.telephone_employe;
  if (data.adresse_employe !== undefined) updateData.adresse_employe = data.adresse_employe;

  return prisma.employe.update({
    where: { id_employe: idNum },
    data: updateData
  });
};

const obtenirProfil = async (id) => {
  const idNum = parseInt(id);
  if (isNaN(idNum)) throw new Error("ID employé invalide");
  return prisma.employe.findUnique({
    where: { id_employe: idNum },
    include: { departement: true, utilisateur: true }
  });
};

const getSolde = async (id, joursAnnuels = 30) => {
  const idNum = parseInt(id);
  const demandesApprouvees = await prisma.demandes_conge.findMany({
    where: {
      id_employe: idNum,
      statut_demandes_conge: { in: ["approuve", "approuve_rh"] }
    }
  });
  const joursPris = demandesApprouvees.reduce((acc, d) => acc + (d.nombre_jours || 0), 0);
  return { joursAnnuels, joursPris, soldeRestant: joursAnnuels - joursPris };
};

const getMesDemandes = async (id) => {
  return prisma.demandes_conge.findMany({
    where: { id_employe: parseInt(id) },
    orderBy: { date_demande: "desc" },
    include: { types_conge: true }
  });
};

const creerDemande = async (idEmploye, data) => {
  const { id_type_conge, date_debut, date_fin, motif } = data;
  const calculerJours = (debut, fin) => {
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
  const nombre_jours = calculerJours(date_debut, date_fin);
  return prisma.demandes_conge.create({
    data: {
      id_employe: parseInt(idEmploye),
      id_type_conge: parseInt(id_type_conge),
      date_debut: new Date(date_debut),
      date_fin: new Date(date_fin),
      motif,
      nombre_jours,
      statut_demandes_conge: "en_attente"
    }
  });
};

const obtenirTableauDeBord = async (idEmploye) => {
  const id = parseInt(idEmploye);
  const [solde, demandes] = await Promise.all([
    getSolde(id),
    prisma.demandes_conge.findMany({
      where: { id_employe: id },
      orderBy: { date_demande: "desc" },
      include: { types_conge: true }
    })
  ]);
  return { solde, demandes };
};

module.exports = { creerEmploye, modifierEmploye, obtenirProfil, getSolde, getMesDemandes, creerDemande, obtenirTableauDeBord };
