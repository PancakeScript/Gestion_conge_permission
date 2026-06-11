const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ message: "API fonctionnelle" });
});

const authRoutes = require("./routes/auth.routes");
const employeRoutes = require("./routes/employe.routes");
const congeRoutes = require("./routes/conge.routes");
const managerRoutes = require("./routes/manager.routes"); 

app.use("/api/auth", authRoutes);
app.use("/api/employes", employeRoutes);
app.use("/api/conges", congeRoutes);
app.use("/api/manager", managerRoutes); 
app.use("/api/departements", require("./routes/departement.routes"));

module.exports = app;
