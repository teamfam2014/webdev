import {MoviePoster} from './MoviePoster.js'

//Movie Thumbnail
const MovieThumbnail = ({movie, onAdd, onRemove, children}) => (
  <div>
    <MoviePoster poster={movie.Poster}/>    
    <p>{movie.Title}</p>
    {children}
    {onAdd && (<button onClick={() => onAdd(movie)}>+</button>)}
    {onRemove && (<button onClick={() => onRemove(movie)}>-</button>)}
  </div>
)

export {MovieThumbnail}