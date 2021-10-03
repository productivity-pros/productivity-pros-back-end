'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const server = express();
server.use(cors());
const PORT = process.env.PORT;

server.use(express.json());

// Modules ----------------------------------------------------//
const weatherModule = require('./Modules/weather');
const newsModule = require('./Modules/news');

// Routes ----------------------------------------------------//
server.get('/', homeHandler);
server.get('/getWeather', weatherModule.getWeatherHandler);
server.get('/getLatestNews', newsModule.getLatestNewsHandler);
server.get('/getSearchedNews', newsModule.getSearchedNewsHandler);
server.get('*', elseHandler);

// http://localhost:3001
function homeHandler(req, res) {
    res.send('Server Active')
}

// http://localhost:3001/<Anything>
function elseHandler(req, res) {
    res.status(404).send('route not found');
}

// Listener ----------------------//
server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})