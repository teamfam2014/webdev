# Exercise 1

## Working with HTML elements

1. Add a nav bar and display the logo in `/public/logo.png`
1. Create a smaller header saying "Featured for [today's date in mm/dd/yy]". You can just hard-code today's date for now, e.g. `4/7/21`
1. Display an image for the featured show, WandaVision. Image link [here](https://bit.ly/3h92N9p). Set the `width` of the `img` to `75`.
1. Display the title, "WandaVision", and its current rating: 8.1
1. Add another section called "Watchlist", which will display movies the user wants to watch. Display them as an unordered list with just their titles. Right now, they want to watch:

    - Raya and the Last Dragon
    - Soul
    - The Mitchells vs the Machines

## Working with JS values in JSX

1. Extract a variable called `featuredMovie` that looks like this:

    ```js
    const featuredMovie = {
      id: 1,
      title: 'WandaVision',
      rating: 8.1,
      poster: 'https://bit.ly/3h92N9p'
    }
    ```

1. Use the properties of `featuredMovie` to pass data into JSX
1. Get today's date dynamically with a `Date` object, and then format it in JSX

    1. Hint: you could extract the month, date, and year like this:

    ```js
    const [month, date, year] = new Date().toLocaleDateString('en-US').split('/')
    ```

1. Extract watchlist movies into an array of movies:

    ```js
    const watchlistMovies = [
      { id: 2, title: 'Raya and the Last Dragon', poster: 'https://bit.ly/2SpIOsz', rating: 7.4 },
      { id: 3, title: 'Soul', poster: 'https://bit.ly/3trYXdN', rating: 8.1 },
      { id: 4, title: 'The Mitchells vs the Machines', poster: 'https://bit.ly/3eqRmIn', rating: 7.9 },
    ]
    ```

    Display each of these movies individually by referencing them directly, e.g.

    ```js
    <ul>
      <li>{watchlistMovies[0].title}</li>
      ...
    </ul>
    ```

## Extracting components

Looks like we have a few React components that we could pull out into separate files. Extract these components and move them to separate files:

- NavBar
- Logo
- FeaturedMovie
- MoviePoster (inside `FeaturedMovie`)
- WatchList

<details><summary>This is how your App code might look by the end</summary>

App.js:

```js
<div>
  <NavBar />
  <FeaturedMovie />
  <WatchList />
</div>
```

Each of those components may have other React components inside them.

</details>
