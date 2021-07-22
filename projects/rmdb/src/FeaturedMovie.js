import {movies} from './Movies.js'

//Featured Show
const {Poster:poster,Title:title, imdbRating} = movies[0];
console.log(poster);
console.log(title);
console.log(imdbRating);
const FeaturedMovie = () => (
  <div>
    <p>{title}</p>
    <img src={poster} width="75"/>
    <p>Rating: {imdbRating}</p>
  </div>
)

export {FeaturedMovie}