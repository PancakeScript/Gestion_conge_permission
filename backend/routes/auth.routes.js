const express = require("express")
const router = express.Router()
const { login } = require("../controllers/auth.controller")

router.post("/login", login)

router.post("/refresh", async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const result = await refreshAccessToken(refreshToken);
    res.json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

module.exports = router