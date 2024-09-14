const Tutorial = require("../models/Tutorial");

// Create a new tutorial
exports.createTutorial = async (req, res) => {
  try {
    const { title, subtitle } = req.body;
    const file = req.file ? req.file.filename : null;
    const tutorial = new Tutorial({ title, subtitle, file });
    await tutorial.save();
    res.status(201).json(tutorial);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all tutorials
exports.getTutorials = async (req, res) => {
  try {
    const tutorials = await Tutorial.find();
    res.status(200).json(tutorials);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single tutorial by ID
exports.getTutorialById = async (req, res) => {
  try {
    const tutorial = await Tutorial.findById(req.params.id);
    if (!tutorial) {
      return res.status(404).json({ message: "Tutorial not found" });
    }
    res.status(200).json(tutorial);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a tutorial
exports.updateTutorial = async (req, res) => {
  try {
    const { title, subtitle } = req.body;
    const file = req.file ? req.file.filename : null;
    const tutorial = await Tutorial.findByIdAndUpdate(
      req.params.id,
      { title, subtitle, file },
      { new: true }
    );
    if (!tutorial) {
      return res.status(404).json({ message: "Tutorial not found" });
    }
    res.status(200).json(tutorial);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a tutorial
exports.deleteTutorial = async (req, res) => {
  try {
    const tutorial = await Tutorial.findByIdAndDelete(req.params.id);
    if (!tutorial) {
      return res.status(404).json({ message: "Tutorial not found" });
    }
    res.status(200).json({ message: "Tutorial deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
