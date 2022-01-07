const mongoose = require('mongoose');

const mongoConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('db connected ...');
    } catch (error) {
        console.log(error);
    }
}

module.exports = mongoConnection;