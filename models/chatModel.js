const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const ChatSchema = new mongoose.Schema({
    userId: {
        type: String,
        require:true,
    },  

    chartId:{
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



const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;
