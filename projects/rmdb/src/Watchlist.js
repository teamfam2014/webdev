import { MovieListSection } from './MovieListSection'

export const Watchlist = ({ movies, onRemove }) => (
  <MovieListSection
    title="Watchlist"
    subtitle="Dive into your favorites!"
    movies={movies.filter(movie => movie.watchlist)}
    onRemove={onRemove}
  />
)
