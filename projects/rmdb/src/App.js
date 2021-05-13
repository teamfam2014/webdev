import './App.scss'
import { NavBar } from './NavBar'
import { FeaturedMovie } from './FeaturedMovie'
import { Watchlist } from './Watchlist'
import { AllMovies } from './AllMovies'
import { useEffect, useState } from 'react'
import { LearnMore } from './LearnMore'
import { MovieEdit } from './MovieEdit'
import axios from 'axios'
import { MovieAdd } from './MovieAdd'
import { assocPath } from 'ramda'

export const App = () => {
  const [loading, setLoading] = useState(true)
  const [movies, setMovies] = useState([])
  const [watchlistMovies, setWatchlistMovies] = useState([])
  const featuredMovie = movies[0]
  const [editingMovie, setEditingMovie] = useState(null)

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('http://localhost:3001/movies')
      setMovies(data)
      setLoading(false)
    })()
  }, [])

  useEffect(() => {
    setWatchlistMovies(movies.filter(movie => movie.watchlist))
  }, [movies])

  const handleAddWatchlist = (movie) => {
    const index = movies.findIndex(m => m.id === movie.id)
    setMovies(assocPath([index, 'watchlist'], true, movies))
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
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {featuredMovie && (<FeaturedMovie featuredMovie={featuredMovie} />)}
          <Watchlist watchlistMovies={watchlistMovies} />
          <AllMovies movies={movies} onAdd={handleAddWatchlist} onEdit={handleEditMovie} />
          <MovieAdd onSave={handleSaveAdd} />
          {editingMovie && (
            <MovieEdit movie={editingMovie} onClose={() => { setEditingMovie(null) }} onSave={handleSaveEdit} />
          )}
          <LearnMore />
        </>
      )}
    </div>
  )
}
