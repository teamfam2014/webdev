import { useContext, useState } from 'react'
import { withInputChange } from './withInputChange'
import { AuthContext } from './contexts/auth'

export const SignInForm = () => {
  const [showSignIn, setShowSignIn] = useState(false)
  const { signIn } = useContext(AuthContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    if (username === 'admin' && password === 'password') {
      signIn({ username: 'admin' })
      setUsername('')
      setPassword('')
    }
  }

  return (
    <div className="sign-in">
      <button onClick={() => setShowSignIn(!showSignIn)}>
        Sign in
      </button>
      {showSignIn && (
        <form onSubmit={handleSubmit}>
          <div className="close-btn">
            <button type="button" onClick={() => setShowSignIn(false)}>x</button>
          </div>
          <label htmlFor="username">Username</label>
          <input type="text" value={username} onChange={withInputChange(setUsername)} />
          <label htmlFor="password">Password</label>
          <input type="password" value={password} onChange={withInputChange(setPassword)} />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  )
}
