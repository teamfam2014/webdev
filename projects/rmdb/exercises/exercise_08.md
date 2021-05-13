# Exercise 8

- [Starting point from exercise 7 solution](https://github.com/AndrewSouthpaw/webdev/tree/exercise-7-solution/projects/rmdb)
- [Exercise 8 solution](https://github.com/AndrewSouthpaw/webdev/tree/exercise-8-solution/projects/rmdb)

## Load movies from database on initial render

We've been reading directly from the `/server/db.json` file, which doesn't seem realistic. Let's now actually make a request to the server for the initial payload of movies when the app renders the first time.

Delete the `import db from 'server/db.json'` statement and the part where you read `movies` from the `db` import.

Next, let's add a `useEffect` hook to make a GET request to `http://localhost:3001/movies` and get those movies. Once the request comes back, update the current state with them.

Make sure you have the `useEffect` hook only run once, otherwise you'll create an infinite loop.

Now that you're loading from the server, you won't start off initially with a featured movie. Your app will probably crash until you conditionally render the `FeaturedMovie` section.

## Fix the Watchlist

Chances are good that your Watchlist will break. Either it will stop showing movies, or the [+] to Watchlist feature stops working.

What's wrong with this code?

```javascript
const [movies, setMovies] = useState([])
const [watchlistMovies, setWatchlistMovies] = useState(movies.filter(movie => movie.watchlist))
```

Even after `movies` is populated, `watchlistMovies` is still `[]`. What's going on?

<details><summary>Click here for the explanation</summary>

We're passing in an initial state for `watchlistMovies`, which is a filtered **empty** array.

While subsequent renders do have the `movies` populated, we're now ignoring that initial state value since we've already run the hook once.

</details>

You'll need to figure out a way to fix the issue and have `watchlistMovies` do two things:

1. Be a piece of state that can be modified
1. Load in new movies to the watchlist when the `movies` array changes.

How might we do that? How do we take action when a piece of data changes?

<details><summary>Click here for the answer</summary>

You should use `useEffect`, and pass in `movies` as a watch variable:

```javascript
useEffect(() => {
  // ...
}, [movies])
```
</details>

**If you want a challenge**, find a way to persist your changes to the watchlist. You should send a `PUT` request to `http://localhost:3001/movies/[id]`, and give it the movie with an extra property, `watchlist: true` to put it into the watchlist.

## Challenges

### Identify the UI bug

> **🤔 Stop and think**
> 
> There's probably a bug with your app right now, even with your movies showing correctly. Can you figure out what's the problem?

<hr>

Let's simulate make your local server a little more realistic to reveal the visual bug with your app right now... Instead of running your server with `$ yarn db`, run it with: 

```
$ yarn db-slow
```

Reload your page, and notice your very beautiful app with blank sections of the screen, because no data has loaded yet. Latency issues are a common source of bugs with UI and business logic. They're easy to miss when you're working locally, because requests are basically instantaneous over localhost.

This looks like a job for some loading messages! There are so many ways to indicate a loading state. If you're feeling adventurous, use [one of the many libraries out there](https://reactjsexample.com/tag/loading/). Otherwise, we can start with a simple "Loading..." text. [MVP, right](https://media.giphy.com/media/HB23IM619qFtS/giphy.gif)?

### Add a loading message

Let's say you have a component `ShowFoo` that should render `Foo` when we're not loading. There are many patterns for showing a loading message. Can you think of three?

<details><summary>Click here for the answer</summary>

1. Control it outside the component and only render `ShowFoo` when we're not loading:

    ```js
    {loading ? (
      <p>Loading...</p>
    ) : (
      <ShowFoo />
    )}
    ```

1. Control it inside the `ShowFoo` component and give it a `loading` prop:

    ```js
    <ShowFoo loading={loading} />
    
    // inside ShowFoo...
    if (loading) return (<p>Loading...</p>)
    return (<Foo />)
    ```

1. Create a `Loadable` component and pass `ShowFoo` as a child. The `Loadable` component has the render logic to either show a message or the `children` passed in.

    ```js
    <Loadable loading={loading}>
      <ShowFoo />
    </Loadable>
    ```

What would be some pros/cons of each approach? 🤔

</details>

Once you've thought of your answers, click above to compare. Go ahead and implement strategy #3 this time.

### Auto-preview the movie poster for add/edit

Product comes back saying the [Preview] button for the movie poster is annoying to users. They want the image to load magically for them once they're done typing.

Add a `useEffect` to track changes to the URL input, and update the `src` of the preview `img` accordingly.

**Bonus challenge**: Right now, as the user is typing, there's a *bunch* of bad image URLs being tried out. See if you can [debounce](https://redd.one/blog/debounce-vs-throttle) the logic so it only loads the image after there's a pause in the user's typing. Debounce won't work the way you might think with `useEffect`, so check out [this Stack Overflow answer](https://stackoverflow.com/a/61786423/2672869) and then read through [this article to deal with the ESLint errors](https://kyleshevlin.com/debounce-and-throttle-callbacks-with-react-hooks).

### Show loading indicators for other network actions

Adding, editing, deleting, they all just hang for a couple seconds with a slower server.

Research shows that anything longer than 100ms between action and response breaks the user's expectation of responsiveness, and they'll think something is wrong with the app. Google did an excellent on the **R**esponse **A**nimation **I**dle **L**oad (RAIL) model [here](https://web.dev/rail/).

Add loading indicators for all these actions! How you do it is up to you.
