const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes')
const movieRoutes = require('./routes/movieRoutes')

const app = express();
require('dotenv').config();
require('./config/db')();

app.use(cors({
    origin: '*'
}))

app.use(express.json());
app.use(userRoutes, movieRoutes);

app.listen(process.env.PORT, (err) => {
    err ? console.log(err) : console.log(`Listening port ${process.env.PORT}`);
});