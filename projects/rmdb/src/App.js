import './App.scss'
import { NavBar } from './NavBar'
import { useMovies } from './useMovies'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Home } from './Home'
import { Detail } from './Detail'

export const App = () => {
  const moviesState = useMovies()

  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
          <Route path="/movies/:id">
            <Detail moviesState={moviesState} />
          </Route>
          <Route path="/" exact>
            <Home moviesState={moviesState} />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}
