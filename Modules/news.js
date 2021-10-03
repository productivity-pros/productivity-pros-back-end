// 'use strict';

const axios = require('axios');
// let cacheMemory = {};

// Classes --------------------------------------------//

class latestnews {
    constructor(element) {
        this.title = element.title;
        this.description = element.description;
        this.url = element.url;
        this.author = element.author;
        this.image = element.image;
    }
}

// localhost:3001/getLatestNews
 function getLatestNewsHandler(req, res) {
    const newsURL = `https://api.currentsapi.services/v1/latest-news?apiKey=${process.env.NEWS_API_KEY}`;

    let latestNewsObject = [];
    // Axios Request------------//
    axios.get(newsURL).then(result => {
        result.data.news.forEach(element => latestNewsObject.push(new latestnews(element)));
        res.send(latestNewsObject);
    }).catch(error => {
        console.log(error);
        res.status(500);
    });
}

// localhost:3001/getSearchedNews?keywords=demon slayer
function getSearchedNewsHandler(req, res) {
    let { keywords } = req.query;
    const newsURL = `https://api.currentsapi.services/v1/search?apiKey=${process.env.NEWS_API_KEY}&keywords=${keywords}`;

    let latestNewsObject = [];
        // Axios Request------------//
        axios.get(newsURL).then(result => {
            result.data.news.forEach(element => latestNewsObject.push(new latestnews(element)));
            res.send(latestNewsObject);
        }).catch(error => {
            console.log(error);
            res.status(500);
        });
}

module.exports = { getLatestNewsHandler, getSearchedNewsHandler };