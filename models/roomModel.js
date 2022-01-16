const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: true
    },
    roomType: {
        type: String,
        required: true
    },
    ownerId: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        unique: false
    },
    speakers: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users'
            }
        ]
    }

}, { timestamps: true })

const Rooms = new mongoose.model('rooms', roomSchema);

module.exports = Rooms;