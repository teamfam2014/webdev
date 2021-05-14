import './App.scss'
import { NavBar } from './NavBar'
import { useMovies } from './useMovies'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Home } from './Home'
import { Detail } from './Detail'
import { useState } from 'react'
import { AuthContext } from './contexts/auth'

export const App = () => {
  const moviesState = useMovies()
  const [user, setUser] = useState(null)
  const signIn = (user) => setUser(user)
  const signOut = () => setUser(null)
  const authContextValue = { user, signIn, signOut }

  return (
    <Router>
      <div className="App">
        <AuthContext.Provider value={authContextValue}>
          <NavBar />
          <Switch>
            <Route path="/movies/:id">
              <Detail moviesState={moviesState} />
            </Route>
            <Route path="/" exact>
              <Home moviesState={moviesState} />
            </Route>
          </Switch>
        </AuthContext.Provider>
      </div>
    </Router>
  )
}
