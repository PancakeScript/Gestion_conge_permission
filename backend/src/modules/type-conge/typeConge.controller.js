const prisma = require('../../shared/config/database');

// ─── GET ALL ──────────────────────────────────────────────────────────
const getAll = async (req, res) => {
  try {
    const types = await prisma.types_conge.findMany({
      orderBy: { nom_types_conge: 'asc' }
    });

    const formatted = types.map(t => ({
      id: t.id_conge,
      nom: t.nom_types_conge,
      duree: t.duree,
      statut: t.statut_types_conge,
    }));

    res.json(formatted);
  } catch (error) {
    console.error('Erreur getAll types:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// ─── CREATE ───────────────────────────────────────────────────────────
const create = async (req, res) => {
  try {
    const { nom, duree, statut } = req.body;

    if (!nom) {
      return res.status(400).json({ error: 'Le nom est obligatoire' });
    }

    const type = await prisma.types_conge.create({
      data: {
        nom_types_conge: nom,
        duree: duree ? parseInt(duree) : null,
        statut_types_conge: statut || 'actif',
      }
    });

    res.status(201).json({
      id: type.id_conge,
      nom: type.nom_types_conge,
      duree: type.duree,
      statut: type.statut_types_conge,
    });
  } catch (error) {
    console.error('Erreur create type:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// ─── UPDATE ───────────────────────────────────────────────────────────
const update = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nom, duree, statut } = req.body;

    const existing = await prisma.types_conge.findUnique({
      where: { id_conge: id }
    });

    if (!existing) {
      return res.status(404).json({ error: 'Type de congé non trouvé' });
    }

    const type = await prisma.types_conge.update({
      where: { id_conge: id },
      data: {
        nom_types_conge: nom || existing.nom_types_conge,
        duree: duree !== undefined ? parseInt(duree) : existing.duree,
        statut_types_conge: statut || existing.statut_types_conge,
      }
    });

    res.json({
      id: type.id_conge,
      nom: type.nom_types_conge,
      duree: type.duree,
      statut: type.statut_types_conge,
    });
  } catch (error) {
    console.error('Erreur update type:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// ─── DELETE ───────────────────────────────────────────────────────────
const deleteType = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const existing = await prisma.types_conge.findUnique({
      where: { id_conge: id }
    });

    if (!existing) {
      return res.status(404).json({ error: 'Type de congé non trouvé' });
    }

    // Vérifier si le type est utilisé dans des demandes
    const demandesLiees = await prisma.demandes_conge.count({
      where: { id_type_conge: id }
    });

    if (demandesLiees > 0) {
      return res.status(400).json({
        error: 'Ce type de congé est utilisé dans des demandes existantes. Impossible de le supprimer.'
      });
    }

    await prisma.types_conge.delete({
      where: { id_conge: id }
    });

    res.json({ message: 'Type de congé supprimé avec succès' });
  } catch (error) {
    console.error('Erreur delete type:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// ─── TOGGLE STATUT ────────────────────────────────────────────────────
const toggleStatut = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const existing = await prisma.types_conge.findUnique({
      where: { id_conge: id }
    });

    if (!existing) {
      return res.status(404).json({ error: 'Type de congé non trouvé' });
    }

    const newStatut = existing.statut_types_conge === 'actif' ? 'inactif' : 'actif';

    const type = await prisma.types_conge.update({
      where: { id_conge: id },
      data: { statut_types_conge: newStatut }
    });

    res.json({
      id: type.id_conge,
      nom: type.nom_types_conge,
      duree: type.duree,
      statut: type.statut_types_conge,
    });
  } catch (error) {
    console.error('Erreur toggleStatut:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

module.exports = { getAll, create, update, deleteType, toggleStatut };
