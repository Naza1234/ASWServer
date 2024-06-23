const WithDrawal = require('../models/WithDrawalModel');
const User = require('../models/UserModel');


// Create a shipment package
exports.createWithDrawal = async (req, res) => {
    try {
        const withDrawal = new WithDrawal(req.body);

        const savedWithDrawal = await withDrawal.save();
        res.json(savedWithDrawal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Get all withdrawals
exports.getAllWithDrawals = async (req, res) => {
    try {
        const withDrawals = await WithDrawal.find();
        const newArray = await Promise.all(withDrawals.map(async (withDrawal) => {
            const user = await User.findById(withDrawal.userId);
            return {
                user,
                withDrawal
            };
        }));
        res.json(newArray);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Find one withdrawal by id
exports.findOneWithDrawalById = async (req, res) => {
    try {
        const withDrawal = await WithDrawal.findById(req.params.id);
        const user = await User.findById(withDrawal.userId);
        
        const data = {
            withDrawal,
            user
        };

        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Delete one shipment package by id
exports.deleteOneWithDrawalById = async (req, res) => {
    try {
        await WithDrawal.findByIdAndDelete(req.params.id);
        res.json({ message: 'Shipment package deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update one shipment package by id
exports.updateOneWithDrawalById = async (req, res) => {
    try {
        const updatedWithDrawal = await WithDrawal.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedWithDrawal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
