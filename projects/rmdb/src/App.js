import './App.scss'
import {NavBar} from './Navbar.js'
import {movies} from './Movies.js'
import { WatchList } from './WatchList.js'
import { FeaturedMovie } from './FeaturedMovie.js'
import { AllMovies } from './AllMovies.js'

const watchListMovies = movies.filter(movie => (movie.watchlist))
const featuredMovie = movies[0]

export const App = () => (
  <div className="App">
    <NavBar />
    <FeaturedMovie featuredMovie={featuredMovie} />
    <WatchList watchListMovies={watchListMovies} />
    <AllMovies movies={movies}/>
  </div>
)
