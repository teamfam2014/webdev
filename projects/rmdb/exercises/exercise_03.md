# Exercise 3

## Bottom-up React component design

We're now seeing new patterns emerging.

![](https://i.imgur.com/jOkM59v.png)

> Sometimes, you're given UI mockups at the onset, and you can think about what React components you want to create from them.
> 
> Other times, like here, you're given an evolving set of requirements. It's important to be able to constantly refactor your components as their scope and functionality shifts.

1. Think about what composable components we could use to create this UI.
1. Refactor your code to optimize for code re-use
1. If you didn't already, create a component called `MovieListSection` which takes `movies` and a `title` as props, and displays the title and lists out the movies.

## Add filters for TV or movies

Right now, we're mixing TV series and movies together. Let's give some control to the user, and let them choose to display any of the following:

1. Only TV series (those with `type: 'series'`)
1. Only movies (those with `type: 'movie'`)
1. Both TV series and movies (any type)

There's many different UIs to provide such control. For now, we're going to create three separate buttons, to let the user switch to that type of display. Something like this:

![](https://i.imgur.com/xZbngcB.png)

You should be adding this code to the `MovieListSection` component.

<details><summary>Click here for hints</summary>

There are *many ways* to solve this challenge. Here's one way.

- Track a piece of state, `filterType`, which will could be `'all'`, `'movie'`, or `'series'`
- When it's `'all'`, use all movies, otherwise filter the movies down with `Array#filter`
- You could do something like this:

```js
const allMovies = filterType === 'all' ? movies : movies.filter(m => m.type === filterType)
```

</details>

## Do not show filter options for Watchlist

You were pretty excited because it looks like the Watchlist section got those filters for free! React component reuse for the win!

Then product comes back to you and says, "We don't want to show those filters for the Watchlist section."

[Well, darn](https://media.giphy.com/media/mWMML2LQBsj8k/giphy.gif).

Without changing your component structure, think about how to *not* show filters for the Watchlist but *do* show filters for All Movies.

<details><summary>Click here for hints</summary>

- Remember you can use conditional rendering, based off props
- Try passing in a prop to `MovieListSection` like `filterable`, and only display the filters when that prop is set to `true`
</details>
