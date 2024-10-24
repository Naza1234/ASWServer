const Deposit = require('../models/DepositModel');
const User = require('../models/UserModel');

const multer =require('multer')
const path = require('path')
const fs = require("fs");
// Create a shipment package
exports.createDeposit = async (req, res) => {
    try {
        const image=req.files
        const imagePath = `./image/${image[0].filename}`;
        // Read the image file
        const imageBuffer = fs.readFileSync(imagePath);
          
         // Convert the image buffer to a data URI
         const dataURI = `data:image/jpeg;base64,${imageBuffer.toString("base64")}`;
        const params={
            userId:req.body.userId,  
            Amount:req.body.Amount,  
            Proof:dataURI,  
        }
        const deposit = new Deposit(params);

        const savedDeposit = await deposit.save();
        res.json(savedDeposit);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const fileStorage=multer.diskStorage({
    destination: (req,file,cd) =>{
        cd(null,'image')
    },
    filename: (req, file, cd)=>{
        cd(null,Date.now() + path.extname(file.originalname))
    }
})
exports.uplaod=multer({
    storage:fileStorage,
     limits:{fileSize: '10000000'},
    fileFilter: (req, file, callback) => {
        const acceptableExtensions = ['png', 'jpg', 'jpeg', 'jpg']
        if (!(acceptableExtensions.some(extension => 
            path.extname(file.originalname).toLowerCase() === `.${extension}`)
        )) {
            return callback(new Error(`Extension not allowed, accepted extensions are ${acceptableExtensions.join(',')}`))
        }
        callback(null, true)
    }
}).any()


const mongoose = require('mongoose'); // Ensure this is imported for ObjectId checking

exports.getAllDeposits = async (req, res) => {
    try {
        const deposits = await Deposit.find();
     

        const newArray = await Promise.all(deposits.map(async (deposit) => {
            // Check if userId exists and is a valid ObjectId
            if (deposit.userId && mongoose.Types.ObjectId.isValid(deposit.userId)) {
                const user = await User.findById(deposit.userId);
                return {
                    user,
                    deposit
                };
            } else {
                // If userId is missing or invalid, skip this deposit
                return null;
            }
        }));

        // Filter out any null values (i.e., deposits without valid userId)
        const filteredArray = newArray.filter(item => item !== null);

        res.json(filteredArray);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Find one deposit by id
exports.findOneDepositById = async (req, res) => {
    try {
        const deposit = await Deposit.findById(req.params.id);
       
      
        const user = await User.findById(deposit.userId);
       

        const data = {
            deposit: deposit,
            user: user
        };

        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Find one deposit by id
exports.findAllDepositById = async (req, res) => {
    try {
        const deposits = await Deposit.find({userId : req.params.id});
     

        const newArray = await Promise.all(deposits.map(async (deposit) => {
            // Check if userId exists and is a valid ObjectId
            if (deposit.userId && mongoose.Types.ObjectId.isValid(deposit.userId)) {
                const user = await User.findById(deposit.userId);
                return {
                    user,
                    deposit
                };
            } else {
                // If userId is missing or invalid, skip this deposit
                return null;
            }
        }));

        // Filter out any null values (i.e., deposits without valid userId)
        const filteredArray = newArray.filter(item => item !== null);

        res.json(filteredArray);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Delete one shipment package by id
exports.deleteOneDepositById = async (req, res) => {
    try {
        await Deposit.findByIdAndDelete(req.params.id);
        res.json({ message: 'Shipment package deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update one shipment package by id
exports.updateOneDepositById = async (req, res) => {
    try {
        const updatedDeposit = await Deposit.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedDeposit);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
