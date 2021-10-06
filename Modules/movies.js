'use strict';
const axios = require('axios');

// Class --------------------------------------------//
class Movie {
  constructor(element) {
    this.title = element.title;
    this.overview = element.overview;
    this.average_votes = element.vote_average;
    this.total_votes = element.vote_count;
    this.image_url = 'https://image.tmdb.org/t/p/w500' + element.poster_path;
    this.popularity = element.popularity;
    this.released_on = element.release_date;
  }
}
function randomMoviePage() {
  return Math.floor((Math.random() * 20) + 1);
}
// localhost:3001/getMovie
function getMovieHandler(req, res) {
  let newObjectArray = [];
  let rand = randomMoviePage();
  let URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=${rand}`;
  axios.get(URL).then(element => {
    element.data.results.forEach(ind => {
      newObjectArray.push(new Movie(ind))
    });
    res.send(newObjectArray.slice(0, 4));
  })
}
module.exports = { getMovieHandler };
