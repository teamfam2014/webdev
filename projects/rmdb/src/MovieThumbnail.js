import { MoviePoster } from './MoviePoster'
import './MovieThumbnail.scss'

export const MovieThumbnail = ({ movie, onAdd, onEdit, onRemove, children }) => (
  <div className="MovieThumbnail">
    <MoviePoster movie={movie} />
    {movie.Title}
    {children}
    {onAdd && (<button onClick={() => onAdd(movie)}>+</button>)}
    {onEdit && (<button onClick={() => onEdit(movie)}>Edit</button>)}
    {onRemove && (<button onClick={() => onRemove(movie)}>Remove</button>)}
  </div>
)
