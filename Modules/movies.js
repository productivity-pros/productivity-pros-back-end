
const axios = require('axios');
let cacheMemory ={};
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
function Random(props) {
  var maxNumber = 45;
  var randomNumber = Math.floor((Math.random() * maxNumber) + 1);
  return <div>{randomNumber}</div>;
}
// localhost:3001/getMovie?query=<name Of MOvie>
function getMovieHandler(req, res) {
  let {query} = req.query;
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${query}`;
  if (cacheMemory[query] !== undefined) {
    res.send(cacheMemory[query]);
  }
  else {
    try {
      axios.get(url).then(results => {

        let newMovieArray = results.data.results.map(element => {
          return new Movie(element);
        });
        cacheMemory[query] = newMovieArray;
        res.send(newMovieArray);
      });
    }
    catch (error) {
      res.send(error);
    }
  }

}
module.exports = { getMovieHandler };
