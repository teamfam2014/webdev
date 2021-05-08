# Exercise 1

## Accessing movie data

The file `/public/movies.json` contains a selection of data from the OMDb API. Import it into your `App.js` file:

```js
import movies from '../public/movies.json'

console.log(movies) // will be a JS Array
```

## Working with HTML elements

1. Add a nav bar and display the logo in `/public/logo.png`
1. Create a smaller header saying "Featured for [today's date in mm/dd/yy]". You can just hard-code today's date for now, e.g. `4/7/21`
1. Display an image for the featured show, WandaVision, which is the first element in `movies.json`. Set the `width` of the `img` to `75`. Display the title, "WandaVision", and its current rating: 8.1. You can hardcode all the values.
1. Add another section called "Watchlist", which will display movies the user wants to watch, which are Soul, Spirited Away, and Batman Begins. Display them as an unordered list with just their titles as text.

## Working with JS values in JSX

1. Extract a variable called `featuredMovie` that reads from the first element in `movies.json`:

    ```js
    const featuredMovie = movies[0]
    ```

1. Use the properties of `featuredMovie` to pass data into JSX and display the featured movie.
1. Get today's date dynamically with a `Date` object, and then format it in JSX

  1. Hint: you could extract the month, date, and year like this:

    ```js
    const [month, date, year] = new Date().toLocaleDateString('en-US').split('/')
    ```

1. The watchlist movies come from `movies.json` as well. Pull them out from the data and display them individually:

    ```jsx
    const watchlistMovies = [movies[1], movies[2], movies[4]]
   
    <ul>
      <li>{watchlistMovies[0].title}</li>
      {/* ... */}
    </ul>
    ```

## Extracting components

Looks like we have a few React components that we could pull out into separate files. Extract these components and move them to separate files:

- NavBar
- Logo
- FeaturedMovie
- MoviePoster (inside `FeaturedMovie`)
- Watchlist

<details><summary>This is how your App code might look by the end</summary>

App.js:

```js
<div>
  <NavBar />
  <FeaturedMovie />
  <Watchlist />
</div>
```

Each of those components may have other React components inside them.

</details>
