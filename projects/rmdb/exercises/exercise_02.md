# Exercise 2

## Make it configurable with props

Everything is still pretty hard-coded. Let's start passing data down as props to other React components.

1. `watchlistMovies` should be declared in `App.js` and passed down as a prop to the `Watchlist` component.
1. `featuredMovie` should be declared in `App.js` and passed down as a prop to the `FeaturedMovie` component.
1. `MoviePoster` should receive a `poster` URL as a prop, and display an appropriately sized image

## Implement Watchlist with map for dynamic context

Right now the implementation of `Watchlist` assumes there's only three movies, and assumes their position in the data array, which seems like a pretty brittle and useless watchlist. Find a way to filter the `movies` list to collect ones in the watchlist (they will have `watchlist: true`), and then use `#map` to dynamically list them out. Remember to add a key!

The Watchlist isn't very exciting with just text. Display both the poster and the name of the movie for each movie in the watchlist.

## List all the movies

Let's add a new section at the bottom to display all the movies in our database! Our users will marvel at our wide collection.

1. Create a new component, `AllMovies`, which takes `movies` as a prop. You should use all the movies in `db.json`.
1. Display all movies passed in. Remember to provide a `key`. Look at the data and think about what would be an appropriate property to use.
1. It's okay that some of the movies are displayed in other sections, e.g. Featured or in the Watchlist.

## Extract a `MovieThumbnail`

Notice how the `Watchlist` and `AllMovies` both display movies with a poster and a title? Looks like an opportunity to extract a shared component!

Create a `MovieThumbnail` which takes a `movie` as a prop and knows how to display the movie's poster and title.

> **🤔 Stop and think**
> 
> Why pass `movie` as a prop, rather than individual props like `title` and `poster`? What would be some of the pros and cons of each?
>
> 
> <details><summary>Click here for discussion after thinking</summary>
> 
> There isn't a right answer here. You'll see both frequently in React codebases.
> 
> When working with higher-level semantic components, e.g. `MovieThumbnail`, `UserContactBadge`, `EmailSummary`, I'll pass in the semantic models, like `movie`, `user`, or `email`.
> 
> When working with lower-level reusable components used across multiple domain models, like `Title`, `Avatar`, or `Summary`, I'll use abstracted language that isn't domain-specific, e.g. `title`, `url`, or `text`.
> 
> The downside to passing domain objects around is that destructuring can get tedious. You're writing:
> 
> ```javascript
> const MovieThumbnail = ({ movie: { Poster, Title } }) => (/* ... */)
> ```
> 
> Instead of:
> 
> ```javascript
> const MovieThumbnail = ({ Poster, Title }) => (/* ... */)
> ```
> 
> The tradeoff is that all the other data comes for free, so if you missed something you don't have to thread it into props later.
> 
> 
> Note how I had you pass in a `url` for `MoviePoster`? In the real world, I probably would've passed in a `movie`, and read off the `Title` from within that component. I did the former to show different ways of passing in props. 😉
> </details>

## Extract shared `MovieList`

There's one more component we can clearly pull out: how to render a list of movies. It should take `movies` as a proper and render them as a list. Use this newly minted component in your `Watchlist` and `AllMovies` components.

There's more shared logic we can pull out, but let's stop here for now.

## Bottom-up React component design

As you can see, React is a dynamic process of refactoring. You will often spawn new components as the need arises and opportunities for code sharing emerges.

Sometimes, you're given UI mockups at the onset, and you can think about what React components you want to create from them.

Other times, like here, you're given an evolving set of requirements. It's important to be able to constantly refactor your components as their scope and functionality shifts.

You might be wondering, "It looks like we have a shared *section* movie list component!" You're quite right, and we'll explore that in the next exercise.

## Challenges

The `Watchlist` has some pretty ho-hum styling right now, it might be displaying vertically rather than in a single row. See if you can display them in a row as rectangles, as you might see on Netflix, IMDb, etc. ([Example](https://i.imgur.com/CS0kFld.png))
