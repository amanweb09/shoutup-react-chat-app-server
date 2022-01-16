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
    async getAllRooms(types) {
        const rooms = await Rooms
            .find({ roomType: { $in: types } })
            .populate('ownerId')
            .exec()
        return rooms;
    }
}

module.exports = new RoomService()