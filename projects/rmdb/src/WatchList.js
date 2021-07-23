import { MovieListSection } from './MovieListSection'

const WatchList = ({watchListMovies, onRemove}) =>{
    console.log('watchListMovies',watchListMovies) 
    return (
        <MovieListSection movies={watchListMovies} title="My Watch List" subtitle="Dive into your favorites!" onRemove={onRemove}/>
    )
}

export {WatchList}