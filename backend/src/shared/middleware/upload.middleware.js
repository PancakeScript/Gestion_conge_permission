const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Créer le dossier uploads/justificatifs s'il n'existe pas
const uploadDir = path.join(__dirname, "../../../uploads/justificatifs");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, "justificatif-" + uniqueSuffix + ext);
  }
});

const fileFilter = (req, file, cb) => {
  // Accepter PDF, images, et documents
  const allowedMimes = [
    "application/pdf",
    "image/jpeg",
    "image/jpg",
    "image/png",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    // Accepter le fichier mais logguer un avertissement
    console.warn("Type de fichier non standard accepté:", file.mimetype);
    cb(null, true);
  }
};

module.exports = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10 MB max
});
