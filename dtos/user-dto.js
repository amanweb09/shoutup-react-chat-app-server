//DTO stands for data transform object
// jab b hume server se kisi object ko modify krke client pe bhejna hota h tab yeh use krte h

class UserDto {
    _id;
    phone;
    activated;
    createdAt;

    constructor(user) {
        this._id = user._id;
        this.phone = user.phone;
        this.createdAt = user.createdAt;
        this.activated = user.activated;
    }

}

module.exports = UserDto;