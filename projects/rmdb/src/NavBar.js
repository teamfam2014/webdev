import logo from './images/logo.png'
import { useState } from 'react'
import './NavBar.scss'
import { SignInForm } from './SignInForm'
import { UserSummary } from './UserSummary'
import { Link, Route } from 'react-router-dom'

export const NavBar = () => {
  const [user, setUser] = useState(null)

  const handleSignOut = () => { setUser(null) }

  return (
    <nav className="NavBar">
      <div className="logo-section">
        <Route path="/movies/:id">
          <Link to="/">
            <button>&lt;</button>
          </Link>
        </Route>
        <img src={logo} alt="RMDb logo" />
      </div>
      {user ? (
        <UserSummary user={user} onSignOut={handleSignOut} />
      ) : (
        <SignInForm onSignIn={setUser} />
      )}
    </nav>
  )
}
