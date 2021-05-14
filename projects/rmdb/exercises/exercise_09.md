# Exercise 9

- [Starting point from exercise 8 solution](https://github.com/AndrewSouthpaw/webdev/tree/exercise-8-solution/projects/rmdb)
- [Exercise 9 solution](https://github.com/AndrewSouthpaw/webdev/tree/exercise-9-solution/projects/rmdb)

## Extract movie state logic

There's a lot of logic sitting in the App component right now. Let's extract the business logic that manages the movies state.

Start by creating a `useMovies` custom hook function. You can place it under a `/hooks` folder.

The `useMovies` function should return the following things:

1. `movies, loading` values
1. `addMovie, updateMovie, deleteMovie` handler functions

Behavior of the hook should be as follows:

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

## Challenges

### Use advanced async hook

There are some really great hook libraries out there dedicated to managing data fetching. Two are:

- [useSWR](https://swr.vercel.app/getting-started)
- [react-async/useAsync](https://docs.react-async.com/getting-started/usage)

Pick one of them to try out and learn about how they work.

### Create CRUD-y watchlist

Our Watchlist needs some love. Right now you can add movies to the watchlist, but you can't remove them once you're finished watching. We want the basic CRUD operations for a watchlist, and to have them persisted.

It turns out maintaining a separate state array of `watchlistMovies` wasn't the best strategy. Let's use the existing `useMovies` functionality to update the `watchlist` property in those movies, and then always derive from the list of `movies` to list our watchlist movies. Remove any `useState` associated with tracking watchlist movies separately.

The neat part is that we get all the network operations for free!

### Build a useList custom hook

Other team members are doing similar CRUD operations for *other* lists of data. Sounds like a good opportunity for another custom hook! It'll save everyone from re-writing the same logic.

Create a `useList` which implements the basic CRUD operations for maintaining a list of values in React state. Use that inside `useMovies`.

<details><summary>Click here for an implementation hint</summary>

There's many ways to design a hook like this. If you need a suggested type signature, try this one:

```tsx
type UseListResultT = {
  data: T,
  set: (values: T[]) => void,
  add: (value: T) => void,
  update: (id: string, changes: T) => void,
  remove: (id: string) => void,
}
const useList = (initialValue: T): UseListResultT => {}
```

</details>
