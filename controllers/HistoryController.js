const History = require('../models/HistoryModel');

// Create a shipment package
exports.createHistory = async (req, res) => {
    try {
        const history = new History(req.body);

        const savedHistory = await history.save();
        res.json(savedHistory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all shipment packages
exports.getAllHistorys = async (req, res) => {
    try {
        const Historys = await History.find();
        res.json(Historys);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Find one shipment package by id
exports.findOneHistoryById = async (req, res) => {
    try {
        const history = await History.find({userId : req.params.id});
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete one shipment package by id
exports.deleteOneHistoryById = async (req, res) => {
    try {
        await History.findByIdAndDelete(req.params.id);
        res.json({ message: 'Shipment package deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update one shipment package by id
exports.updateOneHistoryById = async (req, res) => {
    try {
        const updatedHistory = await History.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedHistory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
