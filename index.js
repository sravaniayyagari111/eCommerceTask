require('dotenv').config({ path: './variables.env' });

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
var apiRoute = require('./routes/routes.js');

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const app = express();
app.use(cors())
app.use(express.json());

app.use('/api', apiRoute)

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})