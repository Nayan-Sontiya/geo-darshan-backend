require("dotenv").config(); // This must be at the top
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path"); // For handling file paths

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Serve static files from the "uploads" directory (e.g., for images)
app.use("/api/uploads", express.static("uploads"));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
const blogRoutes = require("./routes/blogRoutes");
app.use("/api/blogs", blogRoutes); // Add blog routes

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes); // Add user routes

const tutorialRoutes = require("./routes/tutorialRoutes");
app.use("/api/tutorials", tutorialRoutes); // Add tutorial routes

const galleryRoutes = require("./routes/galleryRoutes");
app.use("/api/gallery", galleryRoutes); // Use gallery routes

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
