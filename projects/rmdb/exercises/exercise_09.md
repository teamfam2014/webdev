# Exercise 9

- [Starting point from exercise 8 solution](https://github.com/AndrewSouthpaw/webdev/tree/exercise-8-solution/projects/rmdb)
- [Exercise 9 solution](https://github.com/AndrewSouthpaw/webdev/tree/exercise-9-solution/projects/rmdb)

## Extract movie state logic

There's a lot of logic sitting in the App component right now. Let's extract the business logic that manages the movies state.

Start by creating a `useMovies` custom hook function. You can place it under a `/hooks` folder.

The `useMovies` function should do the following things:

1. Export `movies, loading` values
1. Export `addMovie, updateMovie, deleteMovie` handler functions
1. `movies` should initially be an empty array with `loading: true`
1. On initial render, load movies using axios, then update the `movies` and `loading` appropriately

Here's the expected signature of the functions:

```tsx
type MovieT = {
  Title: string,
  Year: number,
  Type: 'movie' | 'series',
  Poster: string,
  imdbID: string,
  imdbRating: number,
}

const addMovie = (movie: MovieT): Promise => {}
const updateMovie = (movie: MovieT): Promise => {}
const deleteMovie = (id: string): Promise => {}
```

Use this new `useMovies` hook in your App to pull out all that code.

## Extract useLoading custom hook

Another teammate is working on a detail view for a movie. They said they will similarly have to encapsulate logic around having some `data` and whether it's `loading`. Being the enterprising, forward-thinking person that you are, you notice this as an opportunity to extract another hook.

Create a new hook, `useLoading`, with this signature:

```tsx
type FetchingFnT = () => Promise
type ResultsT = {
  status: 'pending' | 'success',
  value: any,
}
const useLoading = (fetcher: FetchingFnT): ResultsT => {}
```

The behavior of `useLoading` can be described this way:

1. You pass in a function, `fetcher`, which encapsulates your logic for fetching data from the server. Fetcher should return a promise that resolves with the data from the server.
1. Initially, `useLoading` should return `{ loading: true, value: null }`
1. When the `fetcher` resolves the data, it should return `{ loading: false, value: [data] }`

Example usage:

```js
const loadMovies = async () => {
  const { data } = await axios.get('/movies')
  return data
}

const App = () => {
  const { loading, value } = useLoading(loadMovies)
  if (loading) return (<p>Loading...</p>)
  
  return (
    <div>Movies: {JSON.stringify(value)}</div>
  )
}
```

**BONUS**: check out and use a slightly more advanced hook recipe like [`useAsync`](https://usehooks.com/useAsync/), which also provides error handling.

## Challenges

### Use advanced async hook

There are some really great hook libraries out there dedicated to managing data fetching. Two are:

- [useSWR](https://swr.vercel.app/getting-started)
- [react-async/useAsync](https://docs.react-async.com/getting-started/usage)

Pick one of them to try out and learn about how they work.

### Create editable watchlist

Our Watchlist needs some love. Right now you can add movies to the watchlist, but you can't remove them once you're finished watching. We want the basic CRUD operations for a watchlist, and right now we only have the C and R.

You may notice that we're also doing CRUD operations in `useMovies`. That hook is currently managing two things:

1. CRUD operations on a list of values
1. Network calls to persist changes

We're about to build CRUD logic for *another* list of values, so it sounds like a good opportunity for another custom hook.

Create a `useList` which implements the basic CRUD operations for maintaining a list of values in React state. Use that inside `useMovies`, and then reuse it for `useWatchlist`.

<details><summary>Click here for an implementation hint</summary>

There's many ways to design a hook like this. If you need a suggested type signature, try this one:

```tsx
type UseListResultT = {
  data: T,
  add: (value: T) => void,
  update: (id: string, changes: T) => void,
  remove: (id: string) => void,
}
const useList = (initialValue: T): UseListResultT => {}
```

</details>
