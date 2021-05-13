import { useState } from 'react'

const updateField = (setter) => e => setter(e.target.value)

export const SignInForm = ({ onSignIn }) => {
  const [showSignIn, setShowSignIn] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    if (username === 'admin' && password === 'password') {
      onSignIn({ username: 'admin' })
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
          <input type="text" value={username} onChange={updateField(setUsername)} />
          <label htmlFor="password">Password</label>
          <input type="password" value={password} onChange={updateField(setPassword)} />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  )
}
