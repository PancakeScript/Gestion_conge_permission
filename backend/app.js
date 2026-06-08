const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
const employeRoutes = require("./routes/employe.routes")
const authRoutes = require("./routes/auth.routes")
const congeRoutes = require("./routes/conge.routes")

app.use(express.json());
app.use(cookieParser());


app.get("/", (req, res) => {
  res.json({ message: "API fonctionnelle" });
});

app.use("/api/auth", authRoutes)
app.use("/api/employes", employeRoutes)

app.use("/api/conges", congeRoutes)

module.exports = app;