'use strict'
const axios = require('axios');

// localhost:3001/getInspiringExpressions
async function getInspiringExpressionsHandler(req, res) {

  let URL = 'https://api.fisenko.net/v1/quotes/en/random';
  let test = await axios.get(URL);
  res.send(test.data);
}

module.exports = { getInspiringExpressionsHandler };
