const express = require("express");
const router = express.Router();
const { verifierToken } = require("../../shared/middleware/auth.middleware");
const prisma = require("../../shared/config/database");

router.use(verifierToken);

router.get("/", async (req, res) => {
  try {
    res.json([]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
