# Exercise 6

## Allow movie to be edited

Feedback from Product says that users want to be able to correct inaccuracies on the site. That seems reasonable to support, considering RMDb leans on user-provided data anyway.

Add an [Edit] button for movies in the "All Movies" section. When the button is clicked, show that movie below in a section below. It should display a `form` with fields for the movie.

![](https://i.imgur.com/NQZ88LC.png)

Here are some details of behavior:

1. Changes made in the form (e.g. `Title`) are not saved *until* the form is saved. You should not see the movie title changing elsewhere on the page as your editing the title.
1. When you save changes, it should appear elsewhere. If you edit a movie title that also appears in the Watchlist, those changes should be seen there.
1. Make the `Year` and `<input type="number">` with reasonable `min` and `max` values. [Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number).
1. The `Type` should be `radio` inputs. [Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio).
1. The `Poster` should be `<input type="url">`. [Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/url).
1. The `imdbRating` should be a `number` with `0.1` as the step value.
1. Clicking [Cancel] does not save changes and stops editing the movie, hiding the form.

## Allow a movie to be deleted

The whole crowd-sourcing tactic of RMDb is creating some headaches... Users are generating silly, nonsense movies!

Let's give our users the ability to fight back and delete movies from the database. [What could possibly go wrong](https://media.giphy.com/media/oyBhHk1TGTYIme4lN8/giphy.gif)?

Display a [Delete] button next to the [Edit] button for each movie in the "All Movies" section. When pressed, the movie should be deleted and no longer shown anywhere in the app, including in the Watchlist.

### Reuse edit movie logic for Add Movie

In the previous exercise, the challenge was to implement an [Add Movie] section. Now that you've made the [Edit Movie] section, it seems like the two are basically the same! See if you can reuse code for both, and find ways to deal with the small variations between the two views.

If you haven't made an "Add Movie" section, refer to the instructions in the previous exercise. It's basically the same as the one you just made, with slight variations.

## Challenges

### Allow poster to be previewed when adding/editing movie

Most UIs will provide a preview of the image URL you provide when you're filling out a form. For example, in Gmail when you add an image via URL it'll give you a preview [like this](https://i.imgur.com/iV7Joya.png).

Let's add some similar functionality for adding/editing the poster of a movie. Add a [Preview] button next to the poster URL input. When the button is clicked, load the current URL from the input into an `img` tag next to the form.

### Require delete to be confirmed

Product says that users are now complaining about accidentally deleting legitimate movies. Let's make the Delete button something that has to be confirmed.

Create a `ConfirmableButton` that will encapsulate the logic. It should have the following behavior:

1. It should render `text` for a button
1. When clicked, it should render `confirmText`
1. When clicked *again*, it should invoke the `onClick` handler
1. If clicked once but not confirmed, the button should revert back to regular `text` after `timeout` seconds

When the [Delete] button is clicked, have it confirm with the message "Really?". Only if clicked again should the movie actually be deleted.

**Bonus**: render a little countdown spinner like [this one](https://github.com/vydimitrov/react-countdown-circle-timer) to visually indicate how much time the user has left to confirm the deletion.

### Create modal view to show movie details

At some point in working with frontends, you will need to create a modal. Let's try working with a library in React. For this round, let's use [Material-UI](https://material-ui.com/getting-started/installation/), a popular React UI framework.

Check out the [Modal](https://material-ui.com/components/modal/#modal) docs for examples to create a modal. Render the edit movie view there, rather than below the "All Movies" section.
