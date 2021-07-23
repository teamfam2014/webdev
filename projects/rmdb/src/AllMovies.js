import { MovieListSection } from './MovieListSection'

const AllMovies = ({movies,onAdd}) =>{
    console.log('movies',movies)
    console.log('onAdd',onAdd)
    return (
        <MovieListSection 
            movies={movies} 
            title="All Movies" 
            subtitle="Discover something new" 
            onAdd={onAdd}
            filterable="true"
        />
    )
}

export {AllMovies}