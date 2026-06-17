const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const app = express();

// Middleware globaux
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Dossier uploads accessible publiquement
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// Route de test
app.get("/", (req, res) => {
  res.json({ message: "API fonctionnelle" });
});

// ============ MODULES ============
app.use("/api/auth", require("./modules/auth/auth.routes"));
app.use("/api/employes", require("./modules/employe/employe.routes"));
app.use("/api/manager", require("./modules/manager/manager.routes"));
app.use("/api/conges", require("./modules/conge/conge.routes"));
app.use("/api/departements", require("./modules/departement/departement.routes"));
app.use("/api/rh", require("./modules/rh/rh.routes"));
app.use("/api/feries", require("./modules/ferie/ferie.routes"));
app.use("/api/types-conge", require("./modules/type-conge/typeConge.routes"));
app.use("/api/notifications", require("./modules/notification/notification.routes"));

// Route pour /api/demandes (redirection)
app.use("/api/demandes", require("./modules/conge/conge.routes"));

// ============ EXPORT ============
module.exports = app;
