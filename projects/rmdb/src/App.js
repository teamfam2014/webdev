import './App.scss'
import {DateHeader} from './DateHeader.js'
import {Featured} from './FeaturedShow.js'
import {WatchList} from './WatchList.js'
import {NavBar} from './Navbar.js'

export const App = () => (
  <div className="App">
    <NavBar />
    <DateHeader/>
    <Featured />
    <WatchList />    
  </div>
)
