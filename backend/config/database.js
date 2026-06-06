const { PrismaClient } = require("@prisma/client")
const { Pool } = require("pg")
const { PrismaPg } = require("@prisma/adapter-pg")

const globalForPrisma = global

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

// Adapter Prisma
const adapter = new PrismaPg(pool)

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log: ["query", "info", "warn", "error"],
  })

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}

module.exports = prisma