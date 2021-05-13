import logo from './images/logo.png'
import { useState } from 'react'
import './NavBar.scss'
import { SignInForm } from './SignInForm'
import { UserSummary } from './UserSummary'

export const NavBar = () => {
  const [user, setUser] = useState(null)

  const handleSignOut = () => { setUser(null) }

  return (
    <nav className="NavBar">
      <img src={logo} alt="RMDb logo" />
      {user ? (
        <UserSummary user={user} onSignOut={handleSignOut} />
      ) : (
        <SignInForm onSignIn={setUser} />
      )}
    </nav>
  )
}
