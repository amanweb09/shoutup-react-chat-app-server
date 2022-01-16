const Rooms = require("../models/roomModel");

class RoomService {
    async create(payload) {
        const { topic, roomType, ownerId } = payload;

        const room = Rooms.create({
            topic,
            roomType,
            ownerId,
            speakers: [ownerId]
        })
        return room;
    }
}

module.exports = new RoomService()