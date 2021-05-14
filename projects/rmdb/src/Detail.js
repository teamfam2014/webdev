import { useParams } from 'react-router-dom'
import { MovieDetail } from './MovieDetail'
import { useEffect } from 'react'

export const Detail = ({ moviesState }) => {
  const { movies, loading, updateMovieFromOMDb } = moviesState
  const { id } = useParams()
  const movie = movies.find(movie => movie.id.toString() === id.toString())

  useEffect(() => {
    updateMovieFromOMDb(movie)
  }, [movie]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="Detail">
      {loading ? (
        <p>Loading...</p>
      ) : (
        movie ? (
          <MovieDetail movie={movie} />
        ) : (
          <h2>404 Movie Not Found 😬</h2>
        )
      )}
    </div>
  )
}
