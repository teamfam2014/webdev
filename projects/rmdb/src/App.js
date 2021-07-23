import './App.scss'
import {NavBar} from './Navbar.js'
import {movies} from './Movies.js'
import { FeaturedMovie } from './FeaturedMovie.js'
import { WatchList } from './WatchList'
import { AllMovies } from './AllMovies'
import { useState } from 'react'

export const App = () => {

  const [watchListMovies, setWatchListMovies] = useState(movies.filter(movie => movie.watchlist))
  const featuredMovie = movies[0]  

  const handleAddWatchList = (movie) => {
    setWatchListMovies(watchListMovies.includes(movie) ? watchListMovies : [...watchListMovies,movie])
  }

  const handleRemoveWatchList = (movie) => {
    const indexToRemove = watchListMovies.findIndex(watchListMovie => watchListMovie === movie)
    const watchListMovieRemoved = [...watchListMovies.slice(0,indexToRemove),...watchListMovies.slice(indexToRemove+1)]
    setWatchListMovies(watchListMovieRemoved)
  }

  return (
    <div className="App">
      <NavBar />
      <FeaturedMovie featuredMovie={featuredMovie} />
      <WatchList watchListMovies={watchListMovies} onRemove={handleRemoveWatchList}/>
      <AllMovies movies={movies} onAdd={handleAddWatchList}/>
    </div>
  )
}