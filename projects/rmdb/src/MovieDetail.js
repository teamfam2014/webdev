import { MoviePoster } from './MoviePoster'

import './MovieDetail.scss'

export const MovieDetail = ({ movie }) => (
  <div className="MovieDetail">
    <section>
      <MoviePoster movie={movie} />
    </section>
    <section>
      <h2>{movie.Title} ({movie.Year}) <span className="rating">{movie.imdbRating} / 10</span></h2>
      <p>{movie.Rated} | {movie.Runtime} | {movie.Genre} | {movie.Released}</p>
      <p>{movie.Plot}</p>

      <p>Director: {movie.Director}</p>
      <p>Cast: {movie.Actors}</p>
    </section>
  </div>
)
