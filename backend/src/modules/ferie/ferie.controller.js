const prisma = require('../config/prisma');

const getAll = async (req, res) => {
  try {
    const feries = await prisma.jours_feries.findMany({
      orderBy: { date_jours_feries: 'asc' }
    });
    const formatted = feries.map(f => ({
      id: f.id_jours_feries,
      nom: f.nom_jours_feries,
      date: f.date_jours_feries,
    }));
    res.json(formatted);
  } catch (error) {
    console.error('Erreur getAll feries:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

const create = async (req, res) => {
  try {
    const { nom, date } = req.body;
    if (!nom || !date) {
      return res.status(400).json({ error: 'Nom et date sont obligatoires' });
    }
    const ferie = await prisma.jours_feries.create({
      data: {
        nom_jours_feries: nom,
        date_jours_feries: new Date(date),
      }
    });
    res.status(201).json({
      id: ferie.id_jours_feries,
      nom: ferie.nom_jours_feries,
      date: ferie.date_jours_feries,
    });
  } catch (error) {
    console.error('Erreur create ferie:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

const update = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nom, date } = req.body;
    const existing = await prisma.jours_feries.findUnique({
      where: { id_jours_feries: id }
    });
    if (!existing) {
      return res.status(404).json({ error: 'Jour férié non trouvé' });
    }
    const ferie = await prisma.jours_feries.update({
      where: { id_jours_feries: id },
      data: {
        nom_jours_feries: nom || existing.nom_jours_feries,
        date_jours_feries: date ? new Date(date) : existing.date_jours_feries,
      }
    });
    res.json({
      id: ferie.id_jours_feries,
      nom: ferie.nom_jours_feries,
      date: ferie.date_jours_feries,
    });
  } catch (error) {
    console.error('Erreur update ferie:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

const deleteFerie = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const existing = await prisma.jours_feries.findUnique({
      where: { id_jours_feries: id }
    });
    if (!existing) {
      return res.status(404).json({ error: 'Jour férié non trouvé' });
    }
    await prisma.jours_feries.delete({ where: { id_jours_feries: id } });
    res.json({ message: 'Jour férié supprimé avec succès' });
  } catch (error) {
    console.error('Erreur delete ferie:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

module.exports = { getAll, create, update, deleteFerie };