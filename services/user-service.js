const Users = require('../models/User');
const mongoose = require('mongoose')

class UserService {
    async findUser(filter) {
        const user = await Users.findOne(filter)
        return user;
    }
    async createUser(data) {
        const user = new Users(data)
        try {
            const saveUser = await user.save();
            return saveUser;
            
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new UserService