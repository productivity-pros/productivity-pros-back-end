'use strict';
const axios = require('axios');
let cacheMemory = {};

class Weather {
  constructor(element) {
    this.date = element.valid_date;
    this.description = element.weather.description;
  }
}
// localhost:3001/getWeather?city=amman
function getWeatherHandler(req, res) {
  let { city } = req.query;
  const weatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&city=${city}`;

  if (cacheMemory[city] !== undefined) {
    res.send(cacheMemory[city]);
  }
  else {
    try {
      axios.get(url).then(resulets => {

        let newWeatherArray = resulets.data.data.map(element => {
          console.log(newWeatherArray);
          return new Weather(element)
        });
        cacheMemory[city] = newWeatherArray;
        res.send(newWeatherArray)
      });
    }
    catch (error) {
      res.send(error);
    }
  }
}
module.exports = { getWeatherHandler };
