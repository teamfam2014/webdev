# Exercise 4

[Starting point from exercise 3](https://github.com/AndrewSouthpaw/webdev/tree/exercise-3-solution/projects/rmdb).

## Add to the watchlist

Users have written in to complain that they can't add to their watchlist. Time to add that functionality!

1. Include a [+] button on each movie thumbnail, so it looks something [like this](https://i.imgur.com/uaJ6ElD.png)
1. When clicked, it adds this movie to the watchlist
1. For this to work, you'll need to pass an event handler as props down to the `MovieThumbnail`. This will involve drilling through a number of components.

![](https://i.imgur.com/P57ZfNl.png)

## Don't show [+] button in Watchlist

It seems strange to have the [+] appearing in the Watchlist, so a user can... add to the watchlist it's already in?

Go ahead and hide the [+] in the Watchlist section.

## Prevent redundant entries

Right now, when you click [+] for the same movie multiple times, it'll add extra redundant entries to the watchlist. Prevent that from happening.

<details><summary>Click here for hints</summary>

You'll need to check if the array of `watchlistMovies` already contains the movie. Some options could include:

- [Array#find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
- [Array#includes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)

</details>

## Create another section

Product comes back and says they've published a [Watch Guide] and [Most Popular] page where people can get more info. You're directed to put this section below the All Movies section.

They also say the styling you've used for each section header is looking pretty cool, and would like you to reuse it.

They also want to pass in subtitles for each section, with messages like:

- **Watchlist**: Dive into your favorites!
- **All Movies**: Discover something new.
- **Learn More**: Not sure what to pick? We're here to help.

Have a little fun with styling and make the subtitle display nicely and differently from the title.

Build a `Section` component that encapsulates logic of display a title in a fancy way. Then use that component in `MovieListSection`, as well as a new top-level component called `LearnMore`. Use the `children` props pattern to make it easy to pass in an arbitrary amount of JSX into `Section` and have it rendered in a specific place.

For the `LearnMore` component, display links to this [Learn More](https://www.imdb.com/what-to-watch/watch-guides/?ref_=hm_watch_wchgd) and [Most Popular](https://www.imdb.com/what-to-watch/popular/?ref_=hm_watch_pop). Since they're a different website, have them pop in a new tab since it's on a different site.

The way you do that is with `target="_blank"`, but there's a security issue there so you need to do a bit more:

```javascript
<a href="www.foo.com" target="_blank" rel="noopener noreferrer">External link</a>
```

Create a shared component `ExternalLink` that takes `children` and displays a `a` link with the proper security setup, so you never have to remember that again.

You'll need to add some styling to those links, such as give some margin so they're not squished against each other. Extend `Section` so you can provide it with a `className` prop, and then create some styling for the `.LearnMore a` links so they have margin. 

## Compare and contrast

Compare your work against the solution [here](https://github.com/AndrewSouthpaw/webdev/tree/exercise-4-solution/projects/rmdb).

## Challenges

### Improve styling

See if you can have the [+] button display on top of the movie poster, [like this](https://i.imgur.com/w71eFKH.png). How you style it is up to you. You can use [this article](https://css-tricks.com/overriding-default-button-styles/#another-challenge-is-getting-people-to-use-them-correctly) to help you remove the default browser styling of buttons.

### Extensible Filters

The Product team comes back to you and says that they now want the Watchlist to have different filters. They want the user to display a particular decade of movies: 2020s, 2010s, 2000s, etc.

This means you'll be passing a different set of filters into each `MovieListSection`, and their state will be managed differently.

Looks like a job for Lifting State Up and Composition! 🦸‍♀️

Your end code might look something like this:

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

