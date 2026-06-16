const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.departement.createMany({
    data: [
      { nom_departement: 'Informatique' },
      { nom_departement: 'Ressources Humaines' },
      { nom_departement: 'Marketing' },
      { nom_departement: 'Finance' },
    ],
    skipDuplicates: true,
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
