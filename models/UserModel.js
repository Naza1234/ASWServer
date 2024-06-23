const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        require:true,
    },  

    userEmail: {
        type: String,
        require:true,
    },  

    userIsAdmin: {
        type: Boolean,
        require:true,
        default: false,
    },  

    AccountBalance: {
        type: Number,
        require:true,
        default: 0,
    },  

    userPin: {
        type: String,
        require:true,
    },  
},{
    timestamps: true
});

// Middleware to encrypt the userPin before saving
UserSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('userPin')) {
        const salt = await bcrypt.genSalt(10);
        user.userPin = await bcrypt.hash(user.userPin, salt);
    }
    next();
});


const User = mongoose.model('User', UserSchema);

module.exports = User;
