import './App.scss'
import {DateHeader} from './DateHeader.js'
import {MoviePoster} from './MoviePoster.js'
import {WatchList} from './WatchList.js'
import {NavBar} from './Navbar.js'

export const App = () => (
  <div className="App">
    <NavBar />
    <DateHeader/>
    <MoviePoster />
    <WatchList />    
  </div>
)
