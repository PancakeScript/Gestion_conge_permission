const prisma = require('../config/prisma');

// ─── GET ALL ──────────────────────────────────────────────────────────
const getAll = async (req, res) => {
  try {
    const employes = await prisma.employe.findMany({
      include: {
        departement: true,
        utilisateur: {
          select: { mail: true }
        }
      },
      orderBy: { nom_employe: 'asc' }
    });

    // Formater pour correspondre au frontend
    const formatted = employes.map(e => ({
      id: e.id_employe,
      nom: e.nom_employe,
      prenom: e.prenom_employe,
      email: e.utilisateur?.mail || '',
      telephone: e.telephone_employe || '',
      adresse: e.adresse_employe || '',
      statut: e.statut_employe,
      dept: e.departement?.nom_departement || 'Non assigné',
      jours_acquis: e.jours_acquis_annuel,
      id_departement: e.id_departement,
    }));

    res.json(formatted);
  } catch (error) {
    console.error('Erreur getAll employes:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// ─── DELETE ───────────────────────────────────────────────────────────
const deleteEmploye = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const employe = await prisma.employe.findUnique({
      where: { id_employe: id }
    });

    if (!employe) {
      return res.status(404).json({ error: 'Employé non trouvé' });
    }

    // Supprimer les demandes liées
    await prisma.demandes_conge.deleteMany({ where: { id_employe: id } });
    await prisma.demandes_permission.deleteMany({ where: { id_employe: id } });

    // Supprimer l'employé
    await prisma.employe.delete({ where: { id_employe: id } });

    // Supprimer l'utilisateur lié
    await prisma.utilisateur.delete({ where: { id_utilisateur: employe.id_utilisateur } });

    res.json({ message: 'Employé supprimé avec succès' });
  } catch (error) {
    console.error('Erreur deleteEmploye:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

module.exports = { getAll, deleteEmploye };