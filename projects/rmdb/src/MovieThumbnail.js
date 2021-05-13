import { MoviePoster } from './MoviePoster'
import './MovieThumbnail.scss'

export const MovieThumbnail = ({ movie, onAdd, onEdit, children }) => (
  <div className="MovieThumbnail">
    <MoviePoster poster={movie.Poster} />
    {movie.Title}
    {children}
    {onAdd && (<button onClick={() => onAdd(movie)}>+</button>)}
    {onEdit && (<button onClick={() => onEdit(movie)}>Edit</button>)}
  </div>
)
