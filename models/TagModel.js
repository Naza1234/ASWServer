const mongoose = require('mongoose');


const TagSchema = new mongoose.Schema({
    TagType: {
        type: String,
        require:true,
    },  

    TagId: {
        type: String,
        require:true,
    },  

},{
    timestamps: true
});




const Tag = mongoose.model('Tag', TagSchema);

module.exports = Tag;
