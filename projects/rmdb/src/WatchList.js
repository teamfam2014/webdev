import { MovieList } from './MovieList.js'

const WatchList = ({watchListMovies}) =>{
    console.log('watchListMovies',watchListMovies)
    return (
        <section>
            <h1>Watch List</h1>
            <MovieList movies={watchListMovies} />
        </section>
    )
}

export {WatchList}