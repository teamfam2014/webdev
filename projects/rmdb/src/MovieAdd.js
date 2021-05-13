import { MovieForm } from './MovieForm'
import { useState } from 'react'

export const MovieAdd = ({ onSave }) => {
  const [showNew, setShowNew] = useState(false)
  const handleClose = () => { setShowNew(false) }
  const handleSave = async (movie) => {
    await onSave(movie)
    setShowNew(false)
  }

  return (
    showNew ? (
      <MovieForm onSave={handleSave} onClose={handleClose} movie={{}} />
    ) : (
      <button onClick={() => setShowNew(true)}>Add new</button>
    )
  )
}
