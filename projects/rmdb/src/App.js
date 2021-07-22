import './App.scss'
import {DateHeader} from './DateHeader.js'
import {FeaturedMovie} from './FeaturedMovie.js'
import {WatchList} from './WatchList.js'
import {NavBar} from './Navbar.js'

export const App = () => (
  <div className="App">
    <NavBar />
    <DateHeader/>
    <FeaturedMovie />
    <WatchList />    
  </div>
)
