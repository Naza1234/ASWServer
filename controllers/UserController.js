const User = require('../models/UserModel');
const bcrypt = require('bcrypt');

// Create a shipment package
// Create a shipment package
exports.createUser = async (req, res) => {
    try {
      const { userEmail } = req.body;
  
      if (!userEmail) {
        return res.status(400).json({ message: "Email is required." });
      }
  
      // Check if any users already exist with this email
      const existingUsers = await User.find({ userEmail });
  
      if (existingUsers.length > 0) {
        // Delete all accounts with the same email
        await User.deleteMany({ userEmail });
  
        // Respond with email in use error (without creating new user)
        return res.status(400).json({ message: "Email already in use. Please create a new account." });
      }
  
      // Create new user if no duplicates exist
      const user = new User(req.body);
      const savedUser = await user.save();
  
      res.status(201).json(savedUser);
  
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
exports.loginUser = async (req, res) => {
    try {
        // Find the user by username
        const user = await User.findOne({ userEmail: req.body.userEmail });
       

       // Compare the provided password with the stored hashed password
       const isMatch = await bcrypt.compare(req.body.userPin, user.userPin);
       

        // Respond with the user details
        res.json( user );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all shipment packages
exports.getAllUsers = async (req, res) => {
    try {
        const Users = await User.find();
        res.json(Users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Find one shipment package by id
exports.findOneUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete one shipment package by id
exports.deleteOneUserById = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'Shipment package deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update one shipment package by id
exports.updateOneUserById = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
