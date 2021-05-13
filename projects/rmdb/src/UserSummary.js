export const UserSummary = ({ user, onSignOut }) => (
  <div>
    {user.username}
    <button onClick={onSignOut}>Sign out</button>
  </div>
)
