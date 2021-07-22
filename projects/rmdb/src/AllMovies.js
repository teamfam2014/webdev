import { MovieList } from "./MovieList"

const AllMovies = ({movies}) => {
    return (
        <section>
            <h1>All Movies</h1>
            <MovieList movies={movies}/>
        </section>
    )
}

export {AllMovies}