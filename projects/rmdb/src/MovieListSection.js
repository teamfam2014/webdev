import { MovieList } from "./MovieList.js"
import { useState } from 'react'

const MovieListSection = ({movies,title, subtitle, filterable, onAdd, onRemove}) => {
    console.log('MovieListSection.js')
    console.log('movies',movies)
    console.log('title', title)
    const [filterType, setFilterType] = useState("all")
    const handleClick = (event) =>{
        setFilterType(event.target.name)
    }
    const filteredMovies = filterType !== "all" ? movies.filter(movie => movie.Type === filterType) : movies
    return (
        <section>
            <h3>{title}</h3>
            <h4>{subtitle}</h4>
            {
                filterable && (
                    <div>
                        <button name="series" onClick={handleClick}>TV Series</button>
                        <button name="movie" onClick={handleClick}>Movies</button>
                        <button name="all" onClick={handleClick}>All</button>
                    </div>
                )
            }
            <MovieList movies={filteredMovies} onAdd={onAdd} onRemove={onRemove}/>
        </section>
    )
}

export {MovieListSection}