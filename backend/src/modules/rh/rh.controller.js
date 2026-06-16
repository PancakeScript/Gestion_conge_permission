const prisma = require('../config/prisma');

const getDashboardStats = async (req, res) => {
  try {
    const now = new Date();
    const debutMois = new Date(now.getFullYear(), now.getMonth(), 1);
    const finMois   = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    // ── STATS ──
    const [enAttente, approuveesMois, refuseesMois, employesActifs] = await Promise.all([
      prisma.demandes_conge.count({
        where: { statut_demandes_conge: { in: ["en_attente", "approuve_manager"] } }
      }),
      prisma.demandes_conge.count({
        where: {
          statut_demandes_conge: "approuve_rh",
          date_demande: { gte: debutMois, lte: finMois }
        }
      }),
      prisma.demandes_conge.count({
        where: {
          statut_demandes_conge: "refuse",
          date_demande: { gte: debutMois, lte: finMois }
        }
      }),
      prisma.employe.count({ where: { statut_employe: "actif" } }),
    ]);

    // ── ABSENCES PAR DÉPARTEMENT ──
    const absencesDept = await prisma.demandes_conge.groupBy({
      by: ["id_employe"],
      where: { statut_demandes_conge: { in: ["approuve_rh", "approuve_manager"] } },
      _sum: { nombre_jours: true },
    });

    // Récupérer les départements des employés
    const employes = await prisma.employe.findMany({
      where: { id_employe: { in: absencesDept.map(a => a.id_employe) } },
      include: { departement: true }
    });

    const deptMap = {};
    for (const abs of absencesDept) {
      const emp = employes.find(e => e.id_employe === abs.id_employe);
      const dept = emp?.departement?.nom_departement || "Autres";
      deptMap[dept] = (deptMap[dept] || 0) + (abs._sum.nombre_jours || 0);
    }
    const absencesParDept = Object.entries(deptMap)
      .map(([dept, total]) => ({ dept, total }))
      .sort((a, b) => b.total - a.total);

    // ── TOP TYPES DE CONGÉS ──
    const topConges = await prisma.demandes_conge.groupBy({
      by: ["id_type_conge"],
      _count: { id_type_conge: true },
      orderBy: { _count: { id_type_conge: "desc" } },
      take: 5,
    });

    const typesConge = await prisma.types_conge.findMany({
      where: { id_conge: { in: topConges.map(t => t.id_type_conge) } }
    });

    const colors = ["#d4af64", "#3b82f6", "#a78bfa", "#f472b6", "#94a3b8"];
    const topCongesData = topConges.map((t, i) => ({
      type:  typesConge.find(tc => tc.id_conge === t.id_type_conge)?.nom_types_conge || "Inconnu",
      count: t._count.id_type_conge,
      color: colors[i] || "#ccc",
    }));

    // ── DEMANDES À TRAITER ──
    const demandesATraiter = await prisma.demandes_conge.findMany({
      where: { statut_demandes_conge: { in: ["en_attente", "approuve_manager"] } },
      orderBy: { date_demande: "desc" },
      take: 5,
      include: {
        employe: { include: { departement: true } },
        types_conge: true,
      }
    });

    const demandes = demandesATraiter.map(d => ({
      id:     d.id_demande_conde,
      nom:    `${d.employe.prenom_employe} ${d.employe.nom_employe}`,
      dept:   d.employe.departement?.nom_departement || "—",
      type:   d.types_conge.nom_types_conge,
      debut:  d.date_debut ? new Date(d.date_debut).toLocaleDateString('fr-FR') : "—",
      fin:    d.date_fin   ? new Date(d.date_fin).toLocaleDateString('fr-FR')   : "—",
      jours:  d.nombre_jours || 0,
      statut: d.statut_demandes_conge,
    }));

    res.json({
      stats: [
        { label: "Demandes en attente", value: enAttente,     icon: "clock",  color: "#d4af64", bg: "#fdf6e3" },
        { label: "Approuvées ce mois",  value: approuveesMois, icon: "check",  color: "#27ae60", bg: "#f0faf4" },
        { label: "Refusées ce mois",    value: refuseesMois,   icon: "x",      color: "#e74c3c", bg: "#fef5f5" },
        { label: "Employés actifs",     value: employesActifs, icon: "users",  color: "#3b82f6", bg: "#eff6ff" },
      ],
      absencesParDept,
      topConges: topCongesData,
      demandes,
    });
  } catch (error) {
    console.error('Erreur dashboard:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

module.exports = { getDashboardStats };