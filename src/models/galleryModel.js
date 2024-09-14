// models/galleryModel.js
const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  place: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String, // URL or path to the image
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Gallery", gallerySchema);
