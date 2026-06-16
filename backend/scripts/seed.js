require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const bcrypt = require('bcryptjs');

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Démarrage du seed...');

  const hashedRH = await bcrypt.hash('admin123', 10);
  const hashedManager = await bcrypt.hash('manager123', 10);
  const hashedEmploye = await bcrypt.hash('employe123', 10);

  // Départements
  const deptInfo = await prisma.departement.create({
    data: { nom_departement: 'Informatique' }
  });
  await prisma.departement.create({
    data: { nom_departement: 'Comptabilité' }
  });
  await prisma.departement.create({
    data: { nom_departement: 'Marketing' }
  });

  // RH
  await prisma.utilisateur.create({
    data: {
      nom_utilisateur: 'Admin',
      prenom: 'RH',
      mail: 'rh@entreprise.mg',
      mdp: hashedRH,
      rh: {
        create: {
          nom_rh: 'Admin',
          prenom_rh: 'RH',
        }
      }
    }
  });

  // Manager
  await prisma.utilisateur.create({
    data: {
      nom_utilisateur: 'Martin',
      prenom: 'Jean',
      mail: 'manager@entreprise.mg',
      mdp: hashedManager,
      manager: {
        create: {
          nom_manager: 'Martin',
          prenom_manager: 'Jean',
          id_departement: deptInfo.id_departement,
        }
      }
    }
  });

  // Employé
  await prisma.utilisateur.create({
    data: {
      nom_utilisateur: 'Dupont',
      prenom: 'Marie',
      mail: 'employe@entreprise.mg',
      mdp: hashedEmploye,
      employe: {
        create: {
          nom_employe: 'Dupont',
          prenom_employe: 'Marie',
          id_departement: deptInfo.id_departement,
        }
      }
    }
  });

  // Types de congé
  await prisma.types_conge.createMany({
    data: [
      { nom_types_conge: 'Annuel',       duree: 30,   statut_types_conge: 'actif' },
      { nom_types_conge: 'Maladie',      duree: 90,   statut_types_conge: 'actif' },
      { nom_types_conge: 'Maternité',    duree: 98,   statut_types_conge: 'actif' },
      { nom_types_conge: 'Sans solde',   duree: null, statut_types_conge: 'actif' },
      { nom_types_conge: 'Exceptionnel', duree: 5,    statut_types_conge: 'actif' },
    ]
  });

  // Jours fériés
  await prisma.jours_feries.createMany({
    data: [
      { nom_jours_feries: 'Jour de l\'An',    date_jours_feries: new Date('2024-01-01') },
      { nom_jours_feries: 'Fête du Travail',  date_jours_feries: new Date('2024-05-01') },
      { nom_jours_feries: 'Fête Nationale',   date_jours_feries: new Date('2024-06-26') },
      { nom_jours_feries: 'Noël',             date_jours_feries: new Date('2024-12-25') },
    ]
  });

  console.log('✅ Seed terminé !');
  console.log('   RH      : rh@entreprise.mg / admin123');
  console.log('   Manager : manager@entreprise.mg / manager123');
  console.log('   Employé : employe@entreprise.mg / employe123');
}

require('dotenv').config();

main()
  .catch(e => { console.error('❌ Erreur:', e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });