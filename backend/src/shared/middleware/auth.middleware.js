const jwt = require("jsonwebtoken")

const verifierToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]
  if (!token) return res.status(401).json({ error: "Token manquant" })
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch {
    return res.status(401).json({ error: "Token invalide ou expiré" })
  }
}

// Vérifier le rôle
const autoriser = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ error: "Accès refusé" })
  }
  next()
}

module.exports = { verifierToken, autoriser } 