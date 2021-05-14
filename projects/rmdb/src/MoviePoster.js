import { Link } from 'react-router-dom'

export const MoviePoster = ({ movie: { id, Poster } }) => (
  <Link to={`/movies/${id}`}>
    <img
      src={Poster}
      width={75}
      alt="Movie poster"
    />
  </Link>
)
