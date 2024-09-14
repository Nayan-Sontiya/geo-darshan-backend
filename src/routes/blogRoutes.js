const express = require("express");
const multer = require("multer");
const {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

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

// Blog Routes
router.post("/", upload.single("image"), createBlog); // Create a blog with image upload
router.get("/", getBlogs); // Get all blogs
router.get("/:id", getBlogById); // Get a blog by ID
router.put("/:id", upload.single("image"), updateBlog); // Update a blog with optional image upload
router.delete("/:id", deleteBlog); // Delete a blog

module.exports = router;
