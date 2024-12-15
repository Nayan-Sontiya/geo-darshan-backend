// routes/contactRoutes.js

const express = require("express");
const {
    createContact,
    getContacts,
    getContactById,
    updateContact,
    deleteContact
} = require("../controllers/contactController");

const router = express.Router();

router.post("/", createContact); // Create a new contact entry
router.get("/", getContacts); // Get all contacts
router.get("/:id", getContactById); // Get a contact by ID
router.put("/:id", updateContact); // Update a contact by ID
router.delete("/:id", deleteContact); // Delete a contact by ID

module.exports = router;
