'use strict';
const axios = require('axios');
class FunFacts {
    constructor(element) {
        this.fact = element.data.fact;
        this.category = element.data.cat;
    }
}
// localhost:3001/getFunFacts
function getFunFactsHandler(req, res) {
    let newObject = {};
    let URL = 'https://asli-fun-fact-api.herokuapp.com';
    axios.get(URL).then(element => {
        newObject = new FunFacts(element.data);
        res.send(newObject);
    })
};

module.exports = { getFunFactsHandler };
