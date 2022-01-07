require('dotenv').config();
const cors = require('cors');

const express = require('express');
const app = express();
const PORT = process.env.PORT;

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

require('./dbConnection')();

app.use(require('./router/routes'));

app.listen(PORT, () => {
    console.log(`listening server on ${PORT}`);
})