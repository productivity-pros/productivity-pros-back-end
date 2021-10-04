'use strict';
const axios = require('axios');
let cacheMemory = {};

class Weather {
  constructor(element) {
    this.date = element.valid_date;
    this.description = element.weather.description;
  }
}
// localhost:3001/getWeather?city=Amman
function getWeatherHandler(req, res) {
  let { city } = req.query;
  let weatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&city=${city}`;

  if (cacheMemory[city] !== undefined) {
    res.send(cacheMemory[city]);
  }
  else {
    try {
      axios.get(weatherURL).then(results => {

        let newWeatherArray = results.data.data.slice(0, 6).map(element => {
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
