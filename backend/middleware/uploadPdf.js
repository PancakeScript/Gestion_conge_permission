const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, "uploads/justificatifs");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + "_" + file.originalname
    );
  }
});

const fileFilter = (req, file, cb) => {

  if (
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(
      new Error("Seuls les PDF sont autorisés"),
      false
    );
  }
};

module.exports = multer({
  storage,
  fileFilter
});