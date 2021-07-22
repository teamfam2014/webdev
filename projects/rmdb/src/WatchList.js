import {movies} from './Movies.js'

//Watchlist
const userWatchList = [movies[1],movies[2],movies[4]]
const WatchList = () =>(
  <ul>
    <li>{userWatchList[0].Title}</li>
    <li>{userWatchList[1].Title}</li>
    <li>{userWatchList[2].Title}</li>
  </ul>
)
export {WatchList}