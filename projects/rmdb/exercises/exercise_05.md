# Exercise 5

## Require user login for Watchlist

It seems strange that the Watchlist is editable by anyone. If the changes were being persisted, then anyone in the world could be editing this Watchlist.

Seems strange, so let's simulate requiring logging in before you can show the watchlist.

## Create [Sign in] form

Add a [Sign in] button to the `NavBar`. When clicked, it should render a small `form` that takes a username and password.

![](https://i.imgur.com/m0lr7va.png)

When the form is submitted, check to see if it matches this information:

```
username: 'user'
password: 'password'
```

Very secure. 

Keep track of whether the user is signed in via state.

## Hide Watchlist until user is signed in

We shouldn't render the watchlist until the user has signed in. (Pay no attention to the fact that we already know the watchlist from the `movies.json` file. We would presumably not have that information either.)

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
> 1. Encapsulate a `Watchlist` component that uses the `MovieListSection`. When the user is not logged in, display one message, otherwise display the `MovieListSection`.
> 1. Create an `AuthenticatedMovieListSection` which takes similar information, but now it can be reused for other sections.
> 1. Refactor the `MovieListSection` to take `isAuthenticated`, `authRequired`, and `children`. When `authRequired && !isAuthenticated`, display the children and not the movie list. Then customize the "auth required" message. 
> 
> </details>

Once you decide on a strategy, implement it.

## Challenges

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

Use `/public/missingMovies.json` for some sample data of movies that you can try adding.
