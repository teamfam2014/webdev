# Exercise 5

## Create [Sign in] form

Add a [Sign in] button to the `NavBar`. When clicked, it should render a small `form` that takes a username and password.

![](https://i.imgur.com/m0lr7va.png)

When the form is submitted, check to see if it matches this information:

```
username: 'admin'
password: 'password'
```

Very secure. 

Keep track of whether the user is signed in via state.

## Display user info when signed in

When the user is signed in, replace the [Sign in] button with a display of the person's username.

## Create way to sign out

When the user is signed in, provide a [Sign out] button that, when clicked, signs the user out.

## Challenges

### Spruce up the styling

You might have something that [looks like this](https://i.imgur.com/GWTDD4f.gif). Not the prettiest.

1. See if you can have the form appear as a little box hovering over the rest of the app. 
2. Give the user a button to close the little box. User's like having a way to immediately undo what they just did. It encourages friendliness with error.

Something like this.

<img src="https://i.imgur.com/JtI9Yah.png" width="300">

Also, provide a failure message like "Invalid username/password" when they try to submit and fail the authentication check.

### Encapsulate some logic

It's likely that your `NavBar` just exploded in complexity. What was a three-line component is now 50+ lines. Yikes!

See if you can encapsulate some of the complexity into more specialized components, e.g. `SignInForm`.

**🤔 Stop and think**

Here's another opportunity for being intentional about component design. How much should you push into the `SignInForm`? Should it be responsible for tracking showing/hiding the form? How about form state? How about authentication?

There's no right or wrong answer here. You could make the `SignInForm` purely "presentational" and pass in all the info as props, or give it more intelligence and shove some of the state management down to that level.

You can check the solutions branch for one possible interpretation.

### Create an Add Movie section

RMDb is a pretty lazy app and relies on being community-driven. Users are encouraged to add movies when they're missing from the database.

Add a new section at the bottom, "Add Movie", which allows the user to enter a movie. There should be a button that displays the form, and look something like this:

![](https://i.imgur.com/Vgu46Nb.png)

The form should take the following information:

```
Title
Year
Type
Poster
imdbID
imdbRating
```

Here are some behavior details:

1. Make the `Year` and `<input type="number">` with reasonable `min` and `max` values. [Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number).
1. The `Type` should be `radio` inputs. [Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio).
1. The `Poster` should be `<input type="url">`. [Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/url).
1. The `imdbRating` should be a `number` with `0.1` as the step value.
1. If [Cancel] is pressed, it should reset the form and hide it. Clicking [Add movie] again should display an empty form.
1. When the form is submitted, it should be added to the list of all movies.

Use `extraMovies.json` for some sample data of movies that you can try adding.

### Hide Watchlist until user is signed in

It seems strange that the Watchlist shows up even when you're not logged in. Instead, we shouldn't render the watchlist until the user has signed in, and instead prompt them to try signing in. (Pay no attention to the fact that we already know the watchlist from the `movies.json` file. We presumably wouldn't have that information either.)

For now, when the user isn't logged in, simply render a message:

![](https://i.imgur.com/6fYFXyo.png)

Notice how we're adding yet another layer of complexity to the `MovieListSection`. Currently, it simply knows how to render a `title` and a list of `movies`. Now we're adding new logic somewhere to require authentication.

> **🤔 Stop and think**
> 
> What would be a good approach here? Think about some options.
> 
>
> <details><summary>Click here for a few options</summary>
> 
> 1. Inside `App`, when the user is not logged on display one message, otherwise display the `MovieListSection`
> 1. Give the `Watchlist` component knowledge of whether the user is signed in, and display a different message when that's the case.
> 1. Encapsulate a `Watchlist` component that uses the `MovieListSection`. When the user is not logged in, display one message, otherwise display the `MovieListSection`.
> 1. Create an `AuthenticatedMovieListSection` which takes similar information, but now it can be reused for other sections. This component simply renders the `MovieListSection` when the user is signed in, or a `Section` with the log in prompt otherwise.
> 1. Refactor the `MovieListSection` to take `isAuthenticated`, `authRequired`, and `children`. When `authRequired && !isAuthenticated`, display the children and not the movie list. Then customize the "auth required" message. 
> 
> In my opinion, the last option of expanding `MovieListSection` is the worst option. It's easy to push too many props onto a component and give it so much functionality until it's impossible to reason about. Try to avoid giving too many responsibilities to a component (auth, section display, filtering, and movie list display).
> 
> </details>

Once you decide on a strategy, implement it.
