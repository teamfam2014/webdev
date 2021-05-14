import { useContext } from 'react'
import { AuthContext } from './contexts/auth'

export const UserSummary = () => {
  const { user, signOut } = useContext(AuthContext)
  return (
    <div>
      {user.username}
      <button onClick={signOut}>Sign out</button>
    </div>
  )
}
