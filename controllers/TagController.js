const Tag = require('../models/TagModel');

// Create a shipment package
exports.createTag = async (req, res) => {
    try {
        const tag = new Tag(req.body);

        const savedTag = await tag.save();
        res.json(savedTag);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all shipment packages
exports.getAllTags = async (req, res) => {
    try {
        const Tags = await Tag.find();
        res.json(Tags);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Find one shipment package by id
exports.findOneTagById = async (req, res) => {
    try {
        const Tag = await Tag.findById(req.params.id);
        res.json(Tag);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete one shipment package by id
exports.deleteOneTagById = async (req, res) => {
    try {
        await Tag.findByIdAndDelete(req.params.id);
        res.json({ message: 'Shipment package deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update one shipment package by id
exports.updateOneTagById = async (req, res) => {
    try {
        const updatedTag = await Tag.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTag);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
