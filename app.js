const express = require('express');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Thing = require('./models/thing');
const dotenv = require('dotenv');
dotenv.config();

const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');
const app = express();

const DB = process.env.DB;
const DB_USER = process.env.DB_USER;
const PASSWORD = process.env.PASSWORD;
const CLUSTER = process.env.CLUSTER;
const DB_URL = `mongodb+srv://${DB_USER}:${PASSWORD}${CLUSTER}/${DB}?retryWrites=true&w=majority`;

mongoose.connect(DB_URL).then(()=>{
    console.log('Successfully connected to MongoDB Atlas!');
})
.catch((error)=>{
    console.log('Unable to connect to MongoBD Atlas!');
    console.error(error);
});

app.use(bodyParser.json());

app.use('/api/stuff',stuffRoutes);
app.use('/api/auth',userRoutes);


module.exports = app;