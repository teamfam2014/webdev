import './App.scss'
import { NavBar } from './NavBar'
import { FeaturedMovie } from './FeaturedMovie'
import { Watchlist } from './Watchlist'
import { AllMovies } from './AllMovies'
import { useState } from 'react'
import { LearnMore } from './LearnMore'
import { MovieEdit } from './MovieEdit'
import { MovieAdd } from './MovieAdd'
import { useMovies } from './useMovies'

export const App = () => {
  const { movies, loading, addMovie, editMovie } = useMovies()
  const featuredMovie = movies[0]
  const [editingMovie, setEditingMovie] = useState(null)

  const handleAddWatchlist = async (movie) => {
    await editMovie({ ...movie, watchlist: true })
  }

  const handleRemoveWatchlist = async (movie) => {
    await editMovie({ ...movie, watchlist: false  })
  }

  const handleEditMovie = (movie) => {
    setEditingMovie(movie)
  }

  const handleSaveEdit = async (updatedMovie) => {
    await editMovie(updatedMovie)
    setEditingMovie(null)
  }

  const handleSaveAdd = async (movie) => addMovie(movie)

  return (
    <div className="App">
      <NavBar />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {featuredMovie && (<FeaturedMovie featuredMovie={featuredMovie} />)}
          <Watchlist movies={movies} onRemove={handleRemoveWatchlist} />
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
