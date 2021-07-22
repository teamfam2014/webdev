import {MoviePoster} from './MoviePoster.js'

//Movie Thumbnail
const MovieThumbnail = ({movie}) => (
  <div>
    <p>{movie.Title}</p>
    <MoviePoster poster={movie.Poster}/>
    <p>Rating: {movie.imdbRating}</p>
  </div>
)

export {MovieThumbnail}