const mongoose = require('mongoose');

const refreshSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }
}, { timestamps: true })

const RefreshToken = new mongoose.model('tokens', refreshSchema);

module.exports = RefreshToken;