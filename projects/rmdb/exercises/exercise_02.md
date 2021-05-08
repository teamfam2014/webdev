# Exercise 2

## Make it configurable with props

Everything is still pretty hard-coded. Let's start passing data down as props to other React components.

1. `watchlistMovies` should be declared in `App.js` and passed down as a prop to the `Watchlist` component.
1. `featuredMovie` should be declared in `App.js` and passed down as a prop to the `FeaturedMovie` component.
1. `MoviePoster` should receive a `poster` URL as a prop, and display an appropriately sized image

## Implement Watchlist with map for dynamic context

Right now the implementation of `Watchlist` assumes there's only three movies, and assumes their position in the data array, which seems like a pretty brittle and useless watchlist. Find a way to filter the `movies` list to collect ones in the watchlist (they will have `watchlist: true`), and then use `#map` to dynamically list them out. Remember to add a key!

The Watchlist isn't very exciting with just text. Display both the poster and the name of the movie for each movie in the watchlist.

Notice the component reuse, to display a movie's poster.

![](https://i.imgur.com/00kCfHC.png)

There's two patterns being repeated:

1. Displaying a movie's poster image
1. Displaying a movie's poster image + title beneath

For now, let's have these be two separate components:

1. `MoviePoster`
1. `MovieThumbail` (which uses `MoviePoster`)

Extract and use these components as appropriate in both the `FeaturedMovie` and `Watchlist` components.

**🤔 Stop and think**

The question is always: "What does this component do?" Should `MoviePoster` *only* display the image of a movie, and some other component displays the poster and the title (i.e. `MovieThumbnail`)? What are the advantages of composing components this way? What are the disadvantages?

## Challenges

The `Watchlist` has some pretty ho-hum styling right now. See if you can display them as rectangles, as you might see on Netflix, IMDb, etc. ([Example](https://i.imgur.com/CS0kFld.png))
