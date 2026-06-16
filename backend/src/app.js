const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.get("/", (req, res) => {
  res.json({ message: "API fonctionnelle" });
});

// Modules
app.use("/api/auth", require("./modules/auth/auth.routes"));
app.use("/api/employes", require("./modules/employe/employe.routes"));
app.use("/api/manager", require("./modules/manager/manager.routes"));
app.use("/api/conges", require("./modules/conge/conge.routes"));
app.use("/api/departements", require("./modules/departement/departement.routes"));

module.exports = app;

// Routes RH
app.use("/api/rh/stats", require("./modules/rh/rh.routes"));
app.use("/api/feries", require("./modules/ferie/ferie.routes"));
app.use("/api/types-conge", require("./modules/type-conge/typeConge.routes"));
app.use("/api/notifications", require("./modules/notification/notification.routes"));

// API RH supplémentaires
app.get("/api/demandes", async (req, res) => {
  try {
    const prisma = require("./shared/config/database");
    const demandes = await prisma.demandes_conge.findMany({ include: { employe: true, types_conge: true }, orderBy: { date_demande: "desc" } });
    return res.json(demandes);
  } catch (err) { return res.status(500).json({ error: err.message }); }
});

app.get("/api/employes", async (req, res) => {
  try {
    const prisma = require("./shared/config/database");
    const employes = await prisma.employe.findMany({ include: { utilisateur: true, departement: true } });
    return res.json(employes);
  } catch (err) { return res.status(500).json({ error: err.message }); }
});
