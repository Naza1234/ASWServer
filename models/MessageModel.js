const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const MessageSchema = new mongoose.Schema({
    userId: {
        type: String,
        require:true,
    },  

    Topic: {
        type: String,
        require:true,
    },    

    Message: {
        type: String,
        require:true,
    },  
},{
    timestamps: true
});



const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
