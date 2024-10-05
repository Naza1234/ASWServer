const WithDrawal = require('../models/WithDrawalModel');
const User = require('../models/UserModel');
const mongoose = require('mongoose');

// Create a new withdrawal
exports.createWithDrawal = async (req, res) => {
    try {
        const withDrawal = new WithDrawal(req.body);
        const savedWithDrawal = await withDrawal.save();
        res.status(201).json(savedWithDrawal); // Send 201 status for created resource
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all withdrawals
exports.getAllWithDrawals = async (req, res) => {
    try {
        const withDrawals = await WithDrawal.find();
        
        const newArray = await Promise.all(withDrawals.map(async (withDrawal) => {
            // Skip if userId is missing or invalid
            if (!withDrawal.userId || !mongoose.Types.ObjectId.isValid(withDrawal.userId)) {
                return null; // Skip this entry
            }
            
            const user = await User.findById(withDrawal.userId);
            
            return { user, withDrawal };
        }));
        
        // Filter out any null values (entries with invalid or missing userId)
        const filteredArray = newArray.filter(item => item !== null);
        
        res.json(filteredArray);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get one withdrawal by ID
exports.findOneWithDrawalById = async (req, res) => {
    try {
        const withDrawal = await WithDrawal.findById(req.params.id);
        if (!withDrawal) {
            return res.status(404).json({ message: 'Withdrawal not found' });
        }

        const user = await User.findById(withDrawal.userId);
        const data = { withDrawal, user };

        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete one withdrawal by ID
exports.deleteOneWithDrawalById = async (req, res) => {
    try {
        const deletedWithDrawal = await WithDrawal.findByIdAndDelete(req.params.id);
        if (!deletedWithDrawal) {
            return res.status(404).json({ message: 'Withdrawal not found' });
        }
        res.json({ message: 'Withdrawal deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update one withdrawal by ID
exports.updateOneWithDrawalById = async (req, res) => {
    try {
        const updatedWithDrawal = await WithDrawal.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedWithDrawal) {
            return res.status(404).json({ message: 'Withdrawal not found' });
        }
        res.json(updatedWithDrawal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
