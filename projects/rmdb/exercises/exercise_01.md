# Exercise 1

## Accessing movie data

The file `db.json` contains a selection of data from the OMDb API. Import it into your `App.js` file:

```js
import db from './db.json'

const movies = db.movies

console.log(movies) // will be a JS Array
```

Normally you wouldn't keep your data file right here at the root, but hey this is an exercise.

## Working with HTML elements

1. Add a nav and display the logo in `/images/logo.png`
1. Create a smaller header saying "Featured for [today's date in mm/dd/yy]". You can just hard-code today's date for now, e.g. `4/7/21`
1. Display an image for the featured show, WandaVision, which is the first element in `movies.json`. Set the `width` of the `img` to `75`. Display the title, "WandaVision", and its current rating: 8.1. You can hardcode all the values.
1. Add another section called "Watchlist", which will display movies the user wants to watch, which are Soul, Spirited Away, and Batman Begins. Display them as an unordered list with just their titles as text.

## Apply some basic styling

Right now your navbar logo is pretty big. Let's shrink it down with some SCSS.

Add a new file, `App.scss`, next to your `App.js` file. In it, scope to the `.App` class, and add some styling to restrict the width of the `img` in the `nav`. Set it to 50px. 

## Working with JS values in JSX

1. Extract a variable called `featuredMovie` that reads from the first element in `movies.json`:

    ```js
    const featuredMovie = movies[0]
    ```

1. Use the properties of `featuredMovie` to pass data into JSX and display the featured movie.
1. Get today's date dynamically with a `Date` object, and then format it in JSX. [Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date).

    <details><summary>Click here for a hint on displaying the date</summary>
    
    You could extract the month, date, and year like this:
    
    ```js
    const [month, date, year] = new Date().toLocaleDateString('en-US').split('/')
    ```
    </details>

1. The watchlist movies come from `movies.json` as well. Pull them out from the data and display them individually, at indexes 1, 2, and **4**:

    ```jsx
    const watchlistMovies = [movies[1], movies[2], movies[4]]
   
    <ul>
      <li>{watchlistMovies[0].Title}</li>
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

You will need to import the `db.json` file a couple times.

We are not looking for using props yet; just cut the code and paste them into separate files.

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
