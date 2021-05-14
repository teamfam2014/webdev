import { useState } from 'react'
import { FeaturedMovie } from './FeaturedMovie'
import { Watchlist } from './Watchlist'
import { AllMovies } from './AllMovies'
import { MovieAdd } from './MovieAdd'
import { MovieEdit } from './MovieEdit'
import { LearnMore } from './LearnMore'

export const Home = ({ moviesState }) => {
  const { movies, loading, addMovie, editMovie } = moviesState
  const featuredMovie = movies[0]
  const [editingMovie, setEditingMovie] = useState(null)

  const handleAddWatchlist = async (movie) => {
    await editMovie({ ...movie, watchlist: true })
  }

  const handleRemoveWatchlist = async (movie) => {
    await editMovie({ ...movie, watchlist: false })
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
    loading ? (
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
    )
  )
}
