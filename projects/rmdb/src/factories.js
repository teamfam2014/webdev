import { nanoid } from 'nanoid'

export const newMovie = (options) => {
  const id = nanoid(4)
  const defaults = {
    id,
    Poster: 'https://www.example.com/poster.jpg',
    Title: 'Movie Title',
    imdbID: `tt1234${id}`,
    Type: 'movie',
    Year: '2021',
    imdbRating: '8.6',
  }

  return { ...defaults, ...options }
}
