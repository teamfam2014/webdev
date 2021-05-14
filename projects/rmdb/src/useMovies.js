import { useEffect, useState } from 'react'
import axios from 'axios'
import { useList } from './useList'

const apiKey = '5593d6a3'

export const useMovies = () => {
  const [loading, setLoading] = useState(true)
  const { data: movies, add, update, set } = useList([])

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('http://localhost:3001/movies')
      set(data)
      setLoading(false)
    })()
  }, [set])

  const editMovie = async (updatedMovie) => {
    await axios.put(`http://localhost:3001/movies/${updatedMovie.id}`, updatedMovie)
    update(updatedMovie)
  }

  const addMovie = async (movie) => {
    const { data } = await axios.post('http://localhost:3001/movies', movie)
    add(data)
  }

  const updateMovieFromOMDb = async (movie) => {
    // ignore if no movie or we already have expanded version
    if (!movie || movie.Plot) return

    const { data } = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`)
    await editMovie({ ...movie, ...data })
  }

  return { movies, loading, addMovie, editMovie, updateMovieFromOMDb }
}
