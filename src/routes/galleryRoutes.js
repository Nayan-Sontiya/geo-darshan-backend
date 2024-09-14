// routes/galleryRoutes.js
const express = require("express");
const multer = require("multer");
const {
  createGalleryItem,
  getGalleryItems,
  getGalleryItemById,
  updateGalleryItem,
  deleteGalleryItem,
} = require("../controllers/galleryController");

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

// File filter for image files only
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only image files are allowed."), false);
  }
};

// Initialize multer with the defined storage and file filter
const upload = multer({ storage: storage, fileFilter: fileFilter });

// Gallery Routes
router.post("/", upload.single("image"), createGalleryItem); // Create a gallery item with image upload
router.get("/", getGalleryItems); // Get all gallery items
router.get("/:id", getGalleryItemById); // Get a gallery item by ID
router.put("/:id", upload.single("image"), updateGalleryItem); // Update a gallery item with optional image upload
router.delete("/:id", deleteGalleryItem); // Delete a gallery item

module.exports = router;
