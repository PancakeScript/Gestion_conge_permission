const prisma = require("../../shared/config/database");
const bcrypt = require("bcrypt");

// ---------- Helpers ----------
const getDepartementId = async (id_manager) => {
  const manager = await prisma.manager.findUnique({ where: { id_manager } });
  if (!manager || !manager.id_departement) throw new Error("Manager sans département");
  return manager.id_departement;
};

// Détecte les chevauchements entre plusieurs demandes de congé non refusées
const detecterChevauchements = (demandes) => {
  const alertes = [];
  for (let i = 0; i < demandes.length; i++) {
    for (let j = i + 1; j < demandes.length; j++) {
      const a = demandes[i];
      const b = demandes[j];
      if (
        a.statut_demandes_conge !== "refuse" &&
        b.statut_demandes_conge !== "refuse" &&
        a.date_debut <= b.date_fin &&
        b.date_debut <= a.date_fin
      ) {
        alertes.push({
          employeA: `${a.employe.prenom_employe} ${a.employe.nom_employe}`,
          employeB: `${b.employe.prenom_employe} ${b.employe.nom_employe}`,
          debutA: a.date_debut,
          finA: a.date_fin,
          debutB: b.date_debut,
          finB: b.date_fin,
        });
      }
    }
  }
  return alertes;
};

// Récupérer les jours fériés pour le planning
const getJoursFeries = async () => {
  const jours = await prisma.jours_feries.findMany({
    select: { id_jours_feries: true, nom_jours_feries: true, date_jours_feries: true },
  });
  return jours.map(j => ({
    id: `ferie-${j.id_jours_feries}`,
    title: j.nom_jours_feries,
    start: j.date_jours_feries,
    allDay: true,
    color: '#e6d5b8',
    textColor: '#6b5c45',
    extendedProps: { type: 'ferie' },
  }));
};

// ---------- Inscription ----------
const createManager = async (data) => {
  const {
    nom_manager, prenom_manager, mail, mdp,
    id_departement, telephone_manager, adresse_manager,
  } = data;

  const existingUser = await prisma.utilisateur.findUnique({ where: { mail } });
  if (existingUser) throw new Error("Cet email est déjà utilisé.");

  const hashedPassword = await bcrypt.hash(mdp, 10);

  const manager = await prisma.$transaction(async (tx) => {
    const user = await tx.utilisateur.create({
      data: {
        nom_utilisateur: nom_manager,
        prenom: prenom_manager,
        mail,
        mdp: hashedPassword,
      },
    });

    return tx.manager.create({
      data: {
        nom_manager,
        prenom_manager,
        telephone_manager: telephone_manager || null,
        adresse_manager: adresse_manager || null,
        id_departement: parseInt(id_departement),
        id_utilisateur: user.id_utilisateur,
        statut_manager: "actif",
      },
    });
  });

  return manager;
};

// ---------- Gestion des demandes ----------
const getDemandesConge = async (id_manager) => {
  const id_dep = await getDepartementId(id_manager);
  const employes = await prisma.employe.findMany({
    where: { id_departement: id_dep },
    select: { id_employe: true },
  });
  const ids = employes.map(e => e.id_employe);
  return prisma.demandes_conge.findMany({
    where: { id_employe: { in: ids } },
    include: { employe: true, types_conge: true },
    orderBy: { date_demande: "desc" },
  });
};

const updateStatutConge = async (id_demande, id_manager, statut, commentaire) => {
  const demande = await prisma.demandes_conge.findUnique({
    where: { id_demande_conde: parseInt(id_demande) },
    include: { employe: true, types_conge: true },
  });
  if (!demande) throw new Error("Demande introuvable");
  const id_dep = await getDepartementId(id_manager);
  if (demande.employe.id_departement !== id_dep)
    throw new Error("Cet employé n'est pas dans votre département");
  if (demande.statut_demandes_conge !== "en_attente")
    throw new Error("Cette demande a déjà été traitée");

  const updated = await prisma.demandes_conge.update({
    where: { id_demande_conde: parseInt(id_demande) },
    data: {
      statut_demandes_conge: statut,
      commentaire_manager: commentaire || null,
    },
  });

  // Notification à l'employé
  if (demande.employe.id_utilisateur) {
    const message =
      statut === "approuve_manager"
        ? "Votre demande de congé a été approuvée par votre manager."
        : "Votre demande de congé a été refusée par votre manager.";
    await prisma.notification.create({
      data: {
        id_utilisateur: demande.employe.id_utilisateur,
        message,
        statut_notification: "non_lu",
      },
    });
  }

  // Notification aux RH si le manager approuve
  if (statut === "approuve_manager") {
    const rhUsers = await prisma.rh.findMany({
      select: { id_utilisateur: true },
    });
    if (rhUsers.length > 0) {
      await prisma.notification.createMany({
        data: rhUsers.map(rh => ({
          id_utilisateur: rh.id_utilisateur,
          message: `Nouvelle demande de congé à valider : ${demande.employe.prenom_employe} ${demande.employe.nom_employe} (${demande.types_conge.nom_types_conge})`,
          statut_notification: "non_lu",
        })),
      });
    }
  }

  return updated;
};

const getDemandesPermission = async (id_manager) => {
  const id_dep = await getDepartementId(id_manager);
  const employes = await prisma.employe.findMany({
    where: { id_departement: id_dep },
    select: { id_employe: true },
  });
  const ids = employes.map(e => e.id_employe);
  return prisma.demandes_permission.findMany({
    where: { id_employe: { in: ids } },
    include: { employe: true },
    orderBy: { date: "desc" },
  });
};

const updateStatutPermission = async (id_demande, id_manager, statut, commentaire) => {
  const demande = await prisma.demandes_permission.findUnique({
    where: { id_demande_permission: parseInt(id_demande) },
    include: { employe: true },
  });
  if (!demande) throw new Error("Permission introuvable");
  const id_dep = await getDepartementId(id_manager);
  if (demande.employe.id_departement !== id_dep)
    throw new Error("Cet employé n'est pas dans votre département");
  if (demande.statut !== "en_attente") throw new Error("Cette demande a déjà été traitée");

  const updated = await prisma.demandes_permission.update({
    where: { id_demande_permission: parseInt(id_demande) },
    data: {
      statut,
      commentaire_manager: commentaire || null,
    },
  });

  if (demande.employe.id_utilisateur) {
    const message =
      statut === "approuve_manager"
        ? "Votre permission a été approuvée."
        : "Votre permission a été refusée.";
    await prisma.notification.create({
      data: {
        id_utilisateur: demande.employe.id_utilisateur,
        message,
        statut_notification: "non_lu",
      },
    });
  }
  return updated;
};

// ---------- Dashboard enrichi ----------
const getDashboardManager = async (id_manager) => {
  const id_dep = await getDepartementId(id_manager);
  const employes = await prisma.employe.findMany({
    where: { id_departement: id_dep },
    include: {
      demandes_conge: {
        where: { statut_demandes_conge: { in: ["en_attente", "approuve_manager", "approuve_rh"] } },
        include: { employe: true, types_conge: true },
      },
      demandes_permission: {
        where: { statut: "en_attente" },
        include: { employe: true },
      },
    },
  });

  const toutesDemandesConge = employes.flatMap(e => e.demandes_conge);
  const chevauchements = detecterChevauchements(toutesDemandesConge);

  // Demandes en attente > 3 jours avec rappel
  const ilYA3Jours = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
  const demandesRetard = toutesDemandesConge.filter(
    d => d.statut_demandes_conge === "en_attente" && new Date(d.date_demande) < ilYA3Jours
  );

  // Rappels automatiques (notification au manager)
  if (demandesRetard.length > 0) {
    const managerUser = await prisma.manager.findUnique({
      where: { id_manager },
      select: { id_utilisateur: true },
    });
    if (managerUser?.id_utilisateur) {
      if (demandesRetard.length > 0) {
        await prisma.notification.createMany({
          data: demandesRetard.map(d => ({
            id_utilisateur: managerUser.id_utilisateur,
            message: `Rappel : demande de congé de ${d.employe.prenom_employe} ${d.employe.nom_employe} en attente depuis plus de 3 jours`,
            statut_notification: "non_lu",
          })),
        });
      }
    }
  }

  return { employes, chevauchements, demandesRetard };
};

// ---------- Planning (calendrier) avec jours fériés et chevauchements en rouge ----------
const getPlanning = async (id_manager) => {
  const id_dep = await getDepartementId(id_manager);
  const employes = await prisma.employe.findMany({
    where: { id_departement: id_dep },
    select: { id_employe: true },
  });
  const ids = employes.map(e => e.id_employe);

  const [conges, permissions] = await Promise.all([
    prisma.demandes_conge.findMany({
      where: { id_employe: { in: ids }, statut_demandes_conge: { not: "refuse" } },
      include: { employe: true, types_conge: true },
    }),
    prisma.demandes_permission.findMany({
      where: { id_employe: { in: ids }, statut: { not: "refuse" } },
      include: { employe: true },
    }),
  ]);

  // Détection des chevauchements pour le planning
  const congesNonRefuses = conges.filter(c => c.statut_demandes_conge !== "refuse");
  const idsEnChevauchement = new Set();
  for (let i = 0; i < congesNonRefuses.length; i++) {
    for (let j = i + 1; j < congesNonRefuses.length; j++) {
      const a = congesNonRefuses[i];
      const b = congesNonRefuses[j];
      if (
        a.date_debut <= b.date_fin &&
        b.date_debut <= a.date_fin
      ) {
        idsEnChevauchement.add(a.id_demande_conde);
        idsEnChevauchement.add(b.id_demande_conde);
      }
    }
  }

  const events = conges.map(c => {
    const isChevauchement = idsEnChevauchement.has(c.id_demande_conde);
    return {
      id: `conge-${c.id_demande_conde}`,
      title: `${c.employe.prenom_employe} ${c.employe.nom_employe} - ${c.types_conge.nom_types_conge}`,
      start: c.date_debut,
      end: c.date_fin
        ? new Date(new Date(c.date_fin).getTime() + 86400000).toISOString().split("T")[0]
        : c.date_debut,
      color: isChevauchement ? "#ef4444" : (c.statut_demandes_conge === "approuve_rh" ? "#d4af64" : "#e5e7eb"),
      borderColor: isChevauchement ? "#b91c1c" : undefined,
      textColor: isChevauchement ? "#ffffff" : undefined,
      extendedProps: {
        type: "conge",
        statut: c.statut_demandes_conge,
        chevauchement: isChevauchement,
      },
    };
  });

  const permissionEvents = permissions.map(p => ({
    id: `perm-${p.id_demande_permission}`,
    title: `Permission - ${p.employe.prenom_employe} ${p.employe.nom_employe}`,
    start: p.date + "T" + p.heure_debut,
    end: p.date + "T" + p.heure_fin,
    color: "#f59e0b",
    extendedProps: { type: "permission", statut: p.statut },
  }));

  const joursFeriesEvents = await getJoursFeries();

  return [...events, ...permissionEvents, ...joursFeriesEvents];
};

module.exports = {
  createManager,
  getDemandesConge,
  updateStatutConge,
  getDemandesPermission,
  updateStatutPermission,
  getDashboardManager,
  getPlanning,
};
