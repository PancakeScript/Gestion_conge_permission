const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
const employeRoutes = require("./routes/employe.routes")

// app.use(
//   cors({
//     origin: [
//     "http://localhost:5173",
//     "https://rdi.onrender.com"
//   ],
//     credentials: true,
//   })
// );

app.use(express.json());
app.use(cookieParser());


app.get("/", (req, res) => {
  res.json({ message: "API fonctionnelle" });
});

app.use("/api/employes", employeRoutes)

module.exports = app;