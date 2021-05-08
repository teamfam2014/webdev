# Exercise 2

## Make it configurable with props

Everything is still pretty hard-coded. Let's start passing data down as props to other React components.

1. `watchlistMovies` should be declared in `App.js` and passed down as a prop to the `WatchList` component.
1. `featuredMovie` should be declared in `App.js` and passed down as a prop to the `FeaturedMovie` component.
1. `MoviePoster` should receive a `poster` URL as a prop, and display an appropriately sized image

## Implement WatchList with map for dynamic context

Right now the implementation of `WatchList` assumes there's only three movies, which isn't a very good watch list. Use `#map` to dynamically list out the watchlist movies. Don't forget to add a key!

The WatchList isn't very exciting with just text. Reuse the `MoviePoster` from the `FeaturedMovie` to display movie posters of the watchlist movies as well. Display both the poster and the name of the movie.

## Challenges

The `WatchList` has some pretty ho-hum styling right now. See if you can display them as rectangles, as you might see on Netflix, IMDb, etc. ([Example](https://i.imgur.com/CS0kFld.png))

You have a couple options for extra long titles. You could either [truncate them via CSS](https://css-tricks.com/snippets/css/truncate-string-with-ellipsis/) or let it wrap onto a new line and make the rectangle tall enough to fit most movie titles.
