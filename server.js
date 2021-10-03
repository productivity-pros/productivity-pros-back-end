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
const movieModule = require('./Modules/movies');
const inspiringExpressionsModule = require('./Modules/inspiringExpressions');
const funFactsHandlerModule = require('./Modules/funFacts');

// Routes ----------------------------------------------------//
server.get('/', homeHandler);
server.get('/getWeather', weatherModule.getWeatherHandler);
server.get('/getMovie', movieModule.getMovieHandler);
server.get('/getInspiringExpressions', inspiringExpressionsModule.getInspiringExpressionsHandler);
server.get('/getFunFacts', funFactsHandlerModule.getFunFactsHandler);
server.get('*', elseHandler);

// http://localhost:3001
function homeHandler(req, res) {
  res.send('Server Active');
}

// http://localhost:3001/<Anything>
function elseHandler(req, res) {
  res.status(404).send('route not found');
}

// Listener ----------------------//
server.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
