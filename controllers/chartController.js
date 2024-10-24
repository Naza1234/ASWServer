const Message = require('../models/chatModel');
const User = require('../models/UserModel');

// Create a shipment package
exports.createMessage = async (req, res) => {
    try {
        const message = new Message(req.body);

        const savedMessage = await message.save();
        res.json(savedMessage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all messages
exports.getAllMessages = async (req, res) => {
    try {
        var id =req.params.id
        const messages = await Message.find({chartId : id});

        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Find one message by id
exports.findOneMessageById = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        const user = await User.findById(message.userId);
        
        const data = {
            message,
            user
        };

        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Delete one shipment package by id
exports.deleteOneMessageById = async (req, res) => {
    try {
        await Message.findByIdAndDelete(req.params.id);
        res.json({ message: 'Shipment package deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update one shipment package by id
exports.updateOneMessageById = async (req, res) => {
    try {
        const updatedMessage = await Message.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedMessage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
