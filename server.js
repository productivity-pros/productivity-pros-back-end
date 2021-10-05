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
const listModule = require('./Modules/list');
const noteModule = require('./Modules/notes');

// Routes ----------------------------------------------------//
server.get('/', homeHandler);
server.get('/getWeather', weatherModule.getWeatherHandler);
server.get('/getLatestNews', newsModule.getLatestNewsHandler);
server.get('/getSearchedNews', newsModule.getSearchedNewsHandler);
server.post('/addlist', listModule.addListHandler);
server.put('/updatelist', listModule.updateListHandler);
server.get('/getlists', listModule.getListHandler);
server.post('/addnote', noteModule.addNoteHandler);
server.put('/updatenote', noteModule.updateNoteHandler);
server.get('/getnotes', noteModule.getNoteHandler);
server.delete('/deletenote', noteModule.deleteNoteHandler);
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