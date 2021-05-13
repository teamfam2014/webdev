import { MovieForm } from './MovieForm'

export const MovieEdit = ({ movie, onClose, onSave }) => (
  <MovieForm movie={movie} onClose={onClose} onSave={onSave} />
)
