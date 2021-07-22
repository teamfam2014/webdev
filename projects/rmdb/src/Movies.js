import db from './db.json'
const movies = db.movies; //taking the root json node and making it into an array
console.log('movieDB',movies)
export { movies }