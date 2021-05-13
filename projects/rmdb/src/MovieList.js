import { MovieThumbnail } from './MovieThumbnail'
import './MovieList.scss'

export const MovieList = ({ movies, onAdd, onEdit }) => (
  <ul className="MovieList">
    {movies.map(movie => (
      <li key={movie.imdbID}>
        <MovieThumbnail movie={movie} onAdd={onAdd} onEdit={onEdit} />
      </li>
    ))}
  </ul>
)
