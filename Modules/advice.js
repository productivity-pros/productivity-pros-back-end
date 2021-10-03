'use strict';
const axios = require('axios');

class Advice {
  constructor(element) {
      this.advice = element.slip.advice;
  }
}
// localhost:3001/getAdvice
function getAdviceHandler(req, res) {
  let newObject = {};
  let URL = 'https://api.adviceslip.com/advice';
  axios.get(URL).then(element => {
    newObject = new Advice(element.data);
    res.send(newObject);
  })
};

module.exports = {getAdviceHandler };