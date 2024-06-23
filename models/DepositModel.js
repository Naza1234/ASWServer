const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const DepositSchema = new mongoose.Schema({
    userId: {
        type: String,
        require:true,
    },  

    Amount: {
        type: Number,
        require:true,
        default: 0,
    },  
    Approved: {
        type: Boolean,
        require:true,
        default: false,
    },  

    Proof: {
        type: String,
        require:true,
    },  
},{
    timestamps: true
});



const Deposit = mongoose.model('Deposit', DepositSchema);

module.exports = Deposit;
