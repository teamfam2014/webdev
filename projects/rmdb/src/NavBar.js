import logo from './images/logo.png'
import { useContext, useState } from 'react'
import './NavBar.scss'
import { SignInForm } from './SignInForm'
import { UserSummary } from './UserSummary'
import { Link, Route } from 'react-router-dom'
import { AuthContext } from './contexts/auth'

export const NavBar = () => {
  const { user } = useContext(AuthContext)

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
        <UserSummary />
      ) : (
        <SignInForm />
      )}
    </nav>
  )
}
