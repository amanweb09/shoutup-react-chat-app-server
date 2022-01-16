//DTO stands for data transform object
// jab b hume server se kisi object ko modify krke client pe bhejna hota h tab yeh use krte h

class RoomDto {
    id;
    roomType;
    topic;
    speakers;
    ownerId;
    createdAt;

    constructor(room) {
        this.id = room._id;
        this.topic = room.topic;
        this.createdAt = room.createdAt;
        this.roomType = room.roomType;
        this.speakers = room.speakers;
        this.ownerId = room.ownerId;
    }

}

module.exports = RoomDto;