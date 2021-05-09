# Exercise 10

## Store auth in context

More and more of your app relies on knowledge of whether the user is authenticated. You're passing that knowledge through `props` all over the place and it's getting out of hand.

Looks like a job for React Context!

Create a new `AuthContext` in `/contexts/auth.js`:

```javascript
import React from 'react'

export const AuthContext = React.createContext(null)
```

Inside your `App`, render the rest of your app inside a `Provider`:

```javascript
<AuthContext.Provider>
  {/* your app */}
</AuthContext.Provider>
```

You should give it an object that has some props:

```
{
  user: the authenticated user object,
  signIn: sets the authenticated user,
  signOut: clears the authenticated user
}
```

You'll want to connect `signIn` and `signOut` to update a piece of React state called `user` being managed by `App`.

## Update the [Sign in] and [Sign out] logic

Rather than passing all those props around, hop into toolbar where you're rendering the [Sign in] button.

Read from the context and use that information accordingly. It might look something like this:

```javascript
const SignInOutButton = () => {
  const { user, signIn, signOut } = useContext(AuthContext)
  const handleSubmit = ({ username, password }) => {
    if (username === 'admin' && password === 'password') {
      signIn({ username: 'admin' })
    }
  }
  return user ? (
    <button onClick={signOut}>
      Sign out
    </button>
  ) : (
    <SignInForm onSubmit={handleSubmit} />
  )
}
```

## Challenges

## Extract `useAuth` custom hook

Grumpy about a bunch of state management in your React components? It's time to extra a custom hook and keep our React components simple!

Your `useAuth` should encapsulate the following knowledge:

1. Whether the user is authenticated
1. Who the user is
1. Setting / unsetting the authenticated user
1. Verifying the username/password credentials are valid

Remember, any `useState` inside your custom hook **will not be global**. All global state should be stored in the **context**, and your custom hook provides the wrapper for interacting with that context.

### Use the `AuthContext` inside your `Watchlist` component

This challenge assumes you implemented hiding the `Watchlist` whether the user is not authenticated. Now update that code to leverage the `AuthContext` so you have fewer props to pass around.
