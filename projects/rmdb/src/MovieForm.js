import { useState } from 'react'
import { withInputChange } from './withInputChange'

const MAX_YEAR = new Date().getFullYear()

export const MovieForm = ({ movie, onClose, onSave }) => {
  const [title, setTitle] = useState(movie.Title || '')
  const [year, setYear] = useState(movie.Year || '')
  const [type, setType] = useState(movie.Type || '')
  const [poster, setPoster] = useState(movie.Poster || '')
  const [rating, setRating] = useState(movie.imdbRating || '')
  const [imdbID, setImdbID] = useState(movie.imdbID || '')

  const handleCancel = () => {
    onClose()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      ...movie,
      imdbID: imdbID,
      Title: title,
      Year: year,
      Type: type,
      Poster: poster,
      imdbRating: rating,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input type="text" required value={title} onChange={withInputChange(setTitle)} />
      </div>
      <div className="form-group">
        <label htmlFor="type">Type</label>
        <input id="movie" type="radio" value="movie" onChange={withInputChange(setType)} checked={type === 'movie'} />
        <label className="checkbox" htmlFor="movie">Movie</label>
        <input id="series" type="radio" value="series" onChange={withInputChange(setType)} checked={type === 'series'} />
        <label className="checkbox" htmlFor="series">Series</label>
      </div>
      <div className="form-group">
        <label htmlFor="year">Year</label>
        <input
          type="number"
          required
          min={1900}
          max={MAX_YEAR}
          step={1}
          value={year}
          onChange={withInputChange(setYear)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="poster">Poster</label>
        <input type="url" required value={poster} onChange={withInputChange(setPoster)} />
      </div>
      <div className="form-group">
        <label htmlFor="rating">Rating</label>
        <input type="number" required step={0.1} value={rating} onChange={withInputChange(setRating)} />
      </div>
      <div className="form-group">
        <label htmlFor="imdbID">IMDB ID</label>
        <input type="text" value={imdbID} onChange={withInputChange(setImdbID)} />
      </div>
      <div>
        <button type="button" onClick={handleCancel}>Cancel</button>
        <button type="submit">Save</button>
      </div>
    </form>
  )
}
