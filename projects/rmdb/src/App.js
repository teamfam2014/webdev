import './App.scss'
import {NavBar} from './Navbar.js'
import {movies} from './Movies.js'
import { WatchList } from './WatchList.js'
import { FeaturedMovie } from './FeaturedMovie.js'
import { AllMovies } from './AllMovies.js'
import { MovieListSection } from './MovieListSection.js'

const watchListMovies = movies.filter(movie => (movie.watchlist))
const featuredMovie = movies[0]

export const App = () => (
  <div className="App">
    <NavBar />
    <FeaturedMovie featuredMovie={featuredMovie} />
    <MovieListSection movies={watchListMovies} title="Watch List"/>
    <MovieListSection movies={movies} title="All Movies" filterable="true"/>    
  </div>
)
