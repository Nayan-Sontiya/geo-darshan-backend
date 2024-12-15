// controllers/contactController.js

const Contact = require("../models/Contact");

// Create a new contact entry
const createContact = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const newContact = new Contact({ name, email, message });
        await newContact.save();
        res.status(201).json(newContact);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all contact entries
const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a contact entry by ID
const getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ error: "Contact not found" });
        }
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a contact entry by ID
const updateContact = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.id,
            { name, email, message },
            { new: true, runValidators: true }
        );
        if (!updatedContact) {
            return res.status(404).json({ error: "Contact not found" });
        }
        res.status(200).json(updatedContact);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a contact entry by ID
const deleteContact = async (req, res) => {
    try {
        const deletedContact = await Contact.findByIdAndDelete(req.params.id);
        if (!deletedContact) {
            return res.status(404).json({ error: "Contact not found" });
        }
        res.status(200).json({ success: "Contact deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createContact,
    getContacts,
    getContactById,
    updateContact,
    deleteContact,
};
