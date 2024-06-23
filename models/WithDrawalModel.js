const mongoose = require('mongoose');


const WithDrawalSchema = new mongoose.Schema({
    userId: {
        type: String,
        require:true,
    },  

    TagType: {
        type: String,
        require:true,
    },  

    tagId: {
        type: String,
        require:true,
    },  

    Amount: {
        type: Number,
        require:true,
        default: 0,
    },  

    Status: {
        type: String,
        require:true,
    },  
},{
    timestamps: true
});


const WithDrawal = mongoose.model('WithDrawal', WithDrawalSchema);

module.exports = WithDrawal;
