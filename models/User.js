const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    avatar: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: true
    },
    activated: {
        type: Boolean,
        required: false,
        default: false
    }
}, { timestamps: true })

const User = new mongoose.model('users', userSchema);

module.exports = User;