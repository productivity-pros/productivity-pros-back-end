'use strict';
const axios = require('axios');

class InspiringExpressions {
  constructor(element) {
      this.text = element.text;
      this.authorName = element.author.name;
  }
}

// localhost:3001/getInspiringExpressions
async function getInspiringExpressionsHandler(req, res) {
  let newObject = {};
  let URL = 'https://api.fisenko.net/v1/quotes/en/random';
  axios.get(URL).then(element => {
    newObject = new InspiringExpressions(element.data);
    res.send(newObject);
  })
};

module.exports = { getInspiringExpressionsHandler };


