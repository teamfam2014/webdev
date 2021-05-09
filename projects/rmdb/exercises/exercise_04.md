# Exercise 4

## Add to the watchlist

Users have written in to complain that they can't add to their watchlist. Time to add that functionality!

1. Include a [+] button on each movie thumbnail, so it looks something [like this](https://i.imgur.com/uaJ6ElD.png)
1. When clicked, it adds this movie to the watchlist
1. For this to work, you'll need to pass an event handler as props down to the `MovieThumbnail`

![](https://i.imgur.com/P57ZfNl.png)

## Prevent redundant entries

Right now, when you click [+] for the same movie multiple times, it'll add extra redundant entries to the watchlist. Prevent that from happening.

<details><summary>Click here for hints</summary>

You'll need to check if the array of `watchlistMovies` already contains the movie. Some options could include:

- [Array#find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
- [Array#includes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)

</details>

## Provide special information for each movie list

You are told that the Watchlist movies need to display the year they were made, while the All Movies movies needs to display whether they're a TV series or movie.

**🤔 Stop and think**

You have a couple options:

1. Pass in props like `showYear`, `showType`, etc., and optionally render them in `MovieThumbnail`
1. Make `MovieThumbnail` more extensible with other information through `children`.

Since we already tried #1, let's go with #2 for variety (and because this is an exercise). The end use should look like this:

```js
// for Watchlist
<MovieThumbnail props...>
  {movie.Title}
  {movie.Year}
</MovieThumbnail>

// for All Movies
<MovieThumbnail props...>
  {movie.Title}
  {movie.Type}
</MovieThumbnail>
```

We can safely assume that `MovieThumbnail` should always display the [+] button to add to watchlist.

## Challenges

### Improve styling

See if you can have the [+] button display on top of the movie poster, [like this](https://i.imgur.com/w71eFKH.png). How you style it is up to you. You can use [this article](https://css-tricks.com/overriding-default-button-styles/#another-challenge-is-getting-people-to-use-them-correctly) to help you remove the default browser styling of buttons.

### Extensible Filters

The Product team comes back to you and says that they now want the Watchlist to have different filters. They want the user to display a particular decade of movies: 2020s, 2010s, 2000s, etc.

This means you'll be passing a different set of filters into each `MovieListSection`, and their state will be managed differently.

Looks like a job for Lifting State Up and Composition! 🦸‍♀️

Your end code should look something like this:

```js
<MovieListSection movies={watchlistMovies}>
  <button onClick={() => filterDecade('2020')}>2020s</button>
  <button onClick={() => filterDecade('2010')}>2010s</button>
  <button onClick={() => filterDecade('2000')}>2000s</button>
  <button onClick={() => filterDecade(null)}>All</button>
</MovieListSection>
<MovieListSection movies={allMovies}>
  <button onClick={() => filterType('series')}>TV series</button>
  <button onClick={() => filterDecade('movie')}>Movie</button>
  <button onClick={() => filterDecade(null)}>All</button>
</MovieListSection>
```

<details><summary>Click here for hints</summary>

- Remember that you can pass an arbitrary set of elements in between the opening and closing tags of a React component and it will be passed in as the `children` prop.
- `MovieListSection` only needs to *render* the `children` and doesn't need to do anything else with it; the children already will be at the level where they can interact with the necessary state

</details>

