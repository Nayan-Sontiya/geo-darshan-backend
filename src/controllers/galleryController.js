// controllers/galleryController.js
const Gallery = require("../models/galleryModel");

// Create a new gallery item
exports.createGalleryItem = async (req, res) => {
  try {
    const { name, place } = req.body;
    const image = req.file ? req.file.filename : ""; // Get the uploaded file's name

    const newItem = new Gallery({ name, place, image });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all gallery items
exports.getGalleryItems = async (req, res) => {
  try {
    const items = await Gallery.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a gallery item by ID
exports.getGalleryItemById = async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a gallery item
exports.updateGalleryItem = async (req, res) => {
  try {
    const { name, place } = req.body;
    const image = req.file ? req.file.filename : "";

    const updatedItem = await Gallery.findByIdAndUpdate(
      req.params.id,
      { name, place, image },
      { new: true }
    );
    if (!updatedItem)
      return res.status(404).json({ message: "Item not found" });
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a gallery item
exports.deleteGalleryItem = async (req, res) => {
  try {
    const deletedItem = await Gallery.findByIdAndDelete(req.params.id);
    if (!deletedItem)
      return res.status(404).json({ message: "Item not found" });
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
