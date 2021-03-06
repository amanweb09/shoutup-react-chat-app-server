const roomService = require("../services/room-service");
const RoomDto = require('../dtos/room-dto')

class RoomsController {
    async create(req, res) {
        const { topic, roomType } = req.body;

        if (!topic || !roomType) {
            return res
                .status(400)
                .json({ err: 'All fields are required!' })
        }

        const room = await roomService.create({
            topic,
            roomType,
            ownerId: req.user._id
        })

        return res
            .status(201)
            .json(new RoomDto(room))
    }
    async index(req, res) {
        const rooms = await roomService.getAllRooms(['open'])

        return res
            .status(200)
            .json(rooms)
    }
}

module.exports = new RoomsController();