const { PrismaClient } = require('@prisma/client');
module.exports = require("../config/database")
const prisma = new PrismaClient();

module.exports = prisma;