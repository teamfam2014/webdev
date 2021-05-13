import './App.scss'
import { NavBar } from './NavBar'
import { FeaturedMovie } from './FeaturedMovie'
import { Watchlist } from './Watchlist'
import db from './db.json'
import { AllMovies } from './AllMovies'
import { useState } from 'react'
import { LearnMore } from './LearnMore'
import { MovieEdit } from './MovieEdit'
import axios from 'axios'
import { MovieAdd } from './MovieAdd'

export const App = () => {
  const [movies, setMovies] = useState(db.movies)
  const featuredMovie = movies[0]
  const [watchlistMovies, setWatchlistMovies] = useState(movies.filter(movie => movie.watchlist))
  const [editingMovie, setEditingMovie] = useState(null)

  const handleAddWatchlist = (movie) => {
    setWatchlistMovies(watchlistMovies.includes(movie) ? watchlistMovies : [...watchlistMovies, movie])
  }

  const handleEditMovie = (movie) => {
    setEditingMovie(movie)
  }

  const handleSaveEdit = async (updatedMovie) => {
    await axios.put(`http://localhost:3001/movies/${updatedMovie.id}`, updatedMovie)
    setMovies(movies.map(movie => (
      movie.imdbID === updatedMovie.imdbID ? updatedMovie : movie
    )))
    setEditingMovie(null)
  }

  const handleSaveAdd = async (movie) => {
    const { data } = await axios.post('http://localhost:3001/movies', movie)
    setMovies([...movies, data])
  }

  return (
    <div className="App">
      <NavBar />
      <FeaturedMovie featuredMovie={featuredMovie} />
      <Watchlist watchlistMovies={watchlistMovies} />
      <AllMovies movies={movies} onAdd={handleAddWatchlist} onEdit={handleEditMovie} />
      <MovieAdd onSave={handleSaveAdd} />
      {editingMovie && (
        <MovieEdit movie={editingMovie} onClose={() => { setEditingMovie(null) }} onSave={handleSaveEdit} />
      )}
      <LearnMore />
    </div>
  )
}
