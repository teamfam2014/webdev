# Exercise 11

## Implement [Sign up] page

Users have started to complain about there being only one account for RMDb: the "admin" account. Guess it's time to let users create their own accounts.

Add a [Sign up] button that directs the user to a `/sign_up` page.

On that page, display a form that accepts a `username` and `password` You should use `<input type="password">` for the latter.

When the form is submitted:

1. Make a `POST` to `http://localhost:3001/users` and save the new user and their plain text password
1. Store the user in the `AuthContext`
1. Redirect them to the home page

> 👹 CAUTION
> 
> In a real app, you should never store a plain text password in your database. [Ever](https://plaintextoffenders.com/about/). Since we're storing them in plaintext, even if it's only locally, *do not use real passwords* you've used elsewhere.

## Implement [Sign in] page

Product has decided they want to make the [Sign in] page more advanced eventually, and they don't like the little dropdown form as it's currently designed. #changingRequirements

When a user clicked [Sign in] from the home page, they should be directed to a `/sign_in` page. It displays a form to enter their username and password.

When the user submits the form:

1. Make a GET to `http://localhost:3001/users?username=[username]`
1. This will return an array of users with that username. (There should only be one, there's not a way to match against exactly one with `json-server`.) Check that the returned user in the database matches the information in the form.
1. If so, authenticate the user in `AuthContext` and redirect to the home page.

> **Do not do that in a production app**
> 
> Typically you'd make a `POST` request to the auth endpoint, e.g. `/users/sign_in`, and pass along the username and password as data in the body. The server would then be responsible for verifying the credentials are valid.
> 
> You should **not** put credential verification logic inside the client frontend code. That code can be manipulated by enterprising hackers.
> 
> If you want an extra challenge, you would play with adding a new middleware on the `json-server` that authenticates the user server-side. Good practice for tinkering with NodeJS!

## Add redirect logic

If a user is already authenticated and visits `/sign_in`, redirect them back to the home page.

**BONUS chalenge**: [Add state](https://reactrouter.com/web/api/Redirect/to-object) on the redirect to indicate the user is already authenticated, and display a message on the home page on the redirect: "Already signed in."

## Challenges

### Provide better sign up experience

1. Users are mistyping their password without realizing it. Provide a password confirmation field, and prevent submitting the form when there's a mismatch.
1. Users want to see the password they're typing. Provide a toggle that let's them show/hide the password text.
1. Prevent a username from being saved more than once
1. Extra challenge: Notify that username is taken *before* they even have to submit the form

### Implement a Detail view for a movie

Users should be able to view details about a movie. When they click on a movie, it should direct them to `/movies/[imdbID]`. Create a new view that shows the movie details. The user should be able to click the browser [Back] button, or click some button in the UI to return to the home page.

When the user visits an invalid ID, e.g. `/movies/foo`, and a movie isn't found, it should display some sort of "Movie not found" message.

### Extract logic to `useAuth`

You can pull into `useAuth` the logic you created to check against the database results. Custom hooks for the win!
