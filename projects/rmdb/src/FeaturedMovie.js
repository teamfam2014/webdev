import { MoviePoster } from './MoviePoster'

export const FeaturedMovie = ({ featuredMovie }) => {
  const [month, date, year] = new Date().toLocaleDateString('en-US').split('/')

  return (
    <section>
      <h3>Featured for {month}/{date}/{year}</h3>
      <MoviePoster movie={featuredMovie} />
      <p>{featuredMovie.Title}</p>
      <div>{featuredMovie.imdbRating}</div>
    </section>
  )
}
