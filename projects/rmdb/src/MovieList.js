import {MovieThumbnail} from './MovieThumbnail.js'
import './MovieList.scss'

const MovieList = ({movies}) => {
    console.log('movieList',movies)
    return (
        <div>
            <ul className="MovieList">
                {movies.map( movie => (
                    <li key={movie.imdbID}><MovieThumbnail key={movie.imdbID} movie={movie} /></li>
                ))}
            </ul>
        </div>
    )
}

export {MovieList}