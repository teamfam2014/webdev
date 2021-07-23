import {MovieThumbnail} from './MovieThumbnail.js'
import './MovieList.scss'

const MovieList = ({movies, onAdd, onRemove}) => {
    console.log('movieList',movies)
    return (
        <div>
            <ul className="MovieList">
                {movies.map( movie => (
                    <li key={movie.imdbID}>
                        <MovieThumbnail movie={movie} onAdd={onAdd} onRemove={onRemove}/>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export {MovieList}