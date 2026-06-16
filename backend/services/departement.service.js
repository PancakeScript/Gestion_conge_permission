const prisma = require("../config/database");

const getAllDepartements = async () => {
  return prisma.departement.findMany({
    orderBy: { nom_departement: "asc" },
  });
};

module.exports = { getAllDepartements };
