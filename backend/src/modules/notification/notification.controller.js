const prisma = require('../config/prisma');

const getAll = async (req, res) => {
  try {
    const { statut } = req.query;
    const where = statut && statut !== 'tous' ? { statut_demandes_conge: statut } : {};

    const demandes = await prisma.demandes_conge.findMany({
      where,
      include: {
        employe: { include: { departement: true } },
        types_conge: true,
      },
      orderBy: { date_demande: 'desc' }
    });

    // LOG TEMPORAIRE
    console.log("statuts:", demandes.map(d => d.statut_demandes_conge));

    const formatted = demandes.map(d => ({
      id:                  d.id_demande_conde,
      nom:                 `${d.employe.nom_employe} ${d.employe.prenom_employe}`,
      dept:                d.employe.departement?.nom_departement || 'N/A',
      type:                d.types_conge.nom_types_conge,
      debut:               d.date_debut ? new Date(d.date_debut).toLocaleDateString('fr-FR') : '—',
      fin:                 d.date_fin   ? new Date(d.date_fin).toLocaleDateString('fr-FR')   : '—',
      jours:               d.nombre_jours,
      statut:              d.statut_demandes_conge,
      motif:               d.motif,
      commentaire_manager: d.commentaire_manager,
      commentaire_rh:      d.commentaire_rh,
      date_demande:        d.date_demande ? new Date(d.date_demande).toLocaleDateString('fr-FR') : '—',
      id_employe:          d.id_employe,
    }));

    res.json(formatted);
  } catch (error) {
    console.error('Erreur getAll demandes:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

const approuverRH = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { commentaire } = req.body;

    const demande = await prisma.demandes_conge.findUnique({
      where: { id_demande_conde: id }
    });

    console.log("demande trouvée:", demande);

    if (!demande) return res.status(404).json({ error: 'Demande non trouvée' });

    if (!['en_attente', 'en attente', 'approuve_manager', 'approuve manager'].includes(demande.statut_demandes_conge)) {
      return res.status(400).json({ error: 'Cette demande ne peut pas être approuvée' });
    }

    await prisma.demandes_conge.update({
      where: { id_demande_conde: id },
      data: {
        statut_demandes_conge: 'approuve_rh',
        commentaire_rh: commentaire || null,
      }
    });

    res.json({ message: 'Demande approuvée avec succès' });
  } catch (error) {
    console.error('Erreur approuverRH:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

const refuser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { commentaire } = req.body;

    const demande = await prisma.demandes_conge.findUnique({
      where: { id_demande_conde: id }
    });

    if (!demande) return res.status(404).json({ error: 'Demande non trouvée' });

    if (['approuve_rh', 'approuve rh'].includes(demande.statut_demandes_conge)) {
      return res.status(400).json({ error: 'Cette demande est déjà approuvée' });
    }

    await prisma.demandes_conge.update({
      where: { id_demande_conde: id },
      data: {
        statut_demandes_conge: 'refuse',
        commentaire_rh: commentaire || null,
      }
    });

    res.json({ message: 'Demande refusée' });
  } catch (error) {
    console.error('Erreur refuser:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

module.exports = { getAll, approuverRH, refuser };