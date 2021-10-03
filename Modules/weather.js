'use strict';

const mongoose = require('mongoose');
const axios = require('axios');

// Database connection --------------------------------------------//
mongoose.connect('mongodb://localhost:27017/testDB');

// Schema --------------------------------------------//
const weatherSchema = new mongoose.Schema({
  data: Array,
  city_name: String,
  lon: Number,
  lat: Number,
});

// Model --------------------------------------------//
const weatherModel = mongoose.model('weatherInfo', weatherSchema);

// localhost:3001/getWeather?city=amman
function getWeatherHandler(req, res) {
  let { city } = req.query;
  const weatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&city=${city}`;
  let regex = new RegExp(city, 'gi');

  /* line 25 checks if the city name exists in the database using "regex", if it does, it gets sent from the database,
    if not, axios is used to retrieve data, then the data is stored in the database and then sent. */
  weatherModel.exists({ city_name: regex }).then(result => {
    if (result) {
      weatherModel.find({ city_name: regex }, (error, data) => {
        if (error) {
          console.log('error in getting data', error.status);
        } else {
          res.send(data);
        }
      });
    }
    else {
      // Axios Request------------//
      axios.get(weatherURL).then(result => {
        weatherModel.create({ // Data creation------//
          data: result.data.data.slice(0, 6).map(item => { return { weatherDescription: item.weather.description, datetime: item.datetime, temp: item.temp }; }),
          city_name: result.data.city_name,
          lon: result.data.lon,
          lat: result.data.lat
        }).then(() => {
          // sending the data that matches the condition ------//
          weatherModel.find({ city_name: regex }, (error, data) => {
            if (error) {
              console.log('error in getting data', error.status);
            } else {
              res.send(data);
            }
          });
        });
      });
    }
  });

}

module.exports = { getWeatherHandler };
