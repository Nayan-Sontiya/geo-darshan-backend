const express = require("express");
const multer = require("multer");
const {
  createTutorial,
  getTutorials,
  getTutorialById,
  updateTutorial,
  deleteTutorial,
} = require("../controllers/tutorialController");

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Set the destination for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Give the file a unique name
  },
});

// File filter for PDF files only
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only PDF files are allowed."), false);
  }
};

// Initialize multer with the defined storage and file filter
const upload = multer({ storage: storage, fileFilter: fileFilter });

// Tutorial Routes
router.post("/", upload.single("file"), createTutorial); // Create a tutorial with file upload
router.get("/", getTutorials); // Get all tutorials
router.get("/:id", getTutorialById); // Get a tutorial by ID
router.put("/:id", upload.single("file"), updateTutorial); // Update a tutorial with optional file upload
router.delete("/:id", deleteTutorial); // Delete a tutorial

module.exports = router;
