const Blog = require("../models/Blog");

// Create a new blog
// Create a new blog
exports.createBlog = async (req, res) => {
  try {
    const { title, subtitle } = req.body;
    const image = req.file ? req.file.filename : null; // Handle uploaded image

    if (!image) {
      return res.status(400).json({ error: "Image is required" });
    }

    const blog = new Blog({ title, subtitle, image });
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all blogs
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const fs = require("fs");
const path = require("path");

// Define the path for visitor.txt
const visitorFilePath = path.join(__dirname, "visitor.txt");

// Get Count visitor
exports.getVisitorCount = async (req, res) => {
  try {
    // Check if visitor.txt exists
    if (!fs.existsSync(visitorFilePath)) {
      // If the file doesn't exist, create it with an initial count of 0
      fs.writeFileSync(visitorFilePath, "0", "utf8");
    }

    // Read the count from visitor.txt
    const data = fs.readFileSync(visitorFilePath, "utf8");
    const visitorCount = parseInt(data, 10); // Convert string to number

    res.status(200).json({ count: visitorCount });
  } catch (error) {
    console.log("Error fetching visitor count:", error);
    res.status(400).json({ error: error.message });
  }
};

// Update visitor count in visitor.txt
// Update visitor count in visitor.txt
exports.updateVisitorCount = async (req, res) => {
  try {
    // Check if visitor.txt exists
    if (!fs.existsSync(visitorFilePath)) {
      // If the file doesn't exist, create it with an initial count of 0
      fs.writeFileSync(visitorFilePath, "0", "utf8");
    }

    // Read the count from visitor.txt
    const data = fs.readFileSync(visitorFilePath, "utf8");
    let visitorCount = parseInt(data, 10); // Convert string to number

    // Increment the count
    visitorCount += 1;

    // Write the updated count back to visitor.txt
    fs.writeFileSync(visitorFilePath, visitorCount.toString(), "utf8");

    // Return the updated count in the response
    res.status(200).json({ count: visitorCount });
  } catch (error) {
    console.log("Error updating visitor count:", error);
    res.status(400).json({ error: error.message });
  }
};
// Get a single blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a blog
exports.updateBlog = async (req, res) => {
  try {
    const { title, subtitle } = req.body;
    const image = req.file ? req.file.filename : req.body.image; // Use new image if provided, else keep the old one

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, subtitle, image },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a blog
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
