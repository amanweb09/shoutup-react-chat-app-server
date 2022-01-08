require('dotenv').config();
const cors = require('cors');

const express = require('express');
const app = express();
const PORT = process.env.PORT;

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

app.use(express.json({
    limit: '8mb'        //size of the request as we are sending a photo on our server
}))
app.use(express.urlencoded({ extended: false }))

app.use('/storage', express.static('storage'));

require('./dbConnection')();

app.use(require('./router/routes'));

app.listen(PORT, () => {
    console.log(`listening server on ${PORT}`);
})