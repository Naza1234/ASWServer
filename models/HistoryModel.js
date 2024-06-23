const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
    userId: {
        type: String,
        require:true,
    },  

    TransferName: {
        type: String,
        require:true,
    },  

    Amount: {
        type: Number,
        require:true,
        default: 0,
    },  

    date: {
        type: String,
        require:true,
    },

    Status: {
        type: String,
        require:true,
        default:"pending",
    },  

    Type: {
        type: String,
        require:true,
        default:"deposit",
    },  
},{
    timestamps: true
});



const History = mongoose.model('History', HistorySchema);

module.exports = History;
