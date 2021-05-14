# Exercise 11

- [Starting point from exercise 10 solution](https://github.com/AndrewSouthpaw/webdev/tree/exercise-10-solution/projects/rmdb)
- [Exercise 11 solution](https://github.com/AndrewSouthpaw/webdev/tree/exercise-11-solution/projects/rmdb)

## Test a simple component

Let's get started with writing a unit test for a simple component. The `MovieThumbnail` component would be a good candidate -- it has some props but no stateful behavior.

Write your tests in a `__tests__/` folder as a sibling to the file. So your directory structure would look like this:

```
- src
  |__ /__tests__
      |__MovieThumbnail.test.js
  |__ MovieThumbnail.js
```

You should already have the testing framework set up for you. All you'll need to start testing is some imports. The `describe` and `it` keywords are provided for you globally through the Jest test runner.

```javascript
import { render, screen } from '@testing-library/react'

describe('MovieThumbnail', () => {
  it('should render something', () => {
    // ...
  })
})
```

## Test user interactions

Next up, we want to test the following business case:

```
The user should be able to add a new movie
```

How should we go about testing this behavior?

> **🤔 Stop and think**
> 
> What exactly are we wanting to test? What do we care about? What would be observable to the user?
> 
> At what level should we be writing this test? Two obvious options would be at the `App` level or the `AddMovie` level. What would be the pros/cons of both?
> 
> <details><summary>Click here for further discussion after thinking it through</summary>

> There's a few observable behaviors:
> 
> - Initially an [Add Movie] button shows
> - When a user clicks the [Add Movie] button, a form appears and the button goes away
> - When user types in the form, the values appear in the inputs
> - [Optional, if you did this] When the user enters a poster URL, it's loaded onto the screen
> - If a user cancels and reopens the form, the form is clear
> - If the user enters values and clicks [Add], the following happens:
>   - The form closes (and resets values)
>   - A network POST request is made with the data
>   - The movie shows up in the list of All Movies
> 
> Testing at the `App` vs. `AddMovie` component level gives you access to asserting over different sets of behavior:
> 
> - `App`
>   - Network requests
>   - When the form is saved, the movie appears in the All Movies list
> - `AddMovie`
>   - Everything else
> 
> **Warning, 🧼📦 speech ahead.**
>   
> There isn't a right or wrong way to write these tests, it's about philosophy.
> 
> Generally, I try to exercise the happy/sad paths of a UI from the root `App` level, or whatever level provides sufficiently broad scope to see all the behavior of the UI that the user would see.
> 
> Any other test cases I typically push further down to the component level.
> 
> This keeps *most* of my tests simpler (only looking at the one component) while allowing me to ensure the component behaves sensibly in the rest of the app.
> 
> Some people would call this "integration" vs. "unit" tests in React. Some folks go so far as to say that "unit" tests should *only* test the component under test and mock everything else out. I would describe these as London TDD / Mockist style. Nothing wrong with it, but I find it doesn't serve me as well in frontend land.
> 
> My philosophy of writing tests is that they should give me confidence my program is running correctly. In my experience, heavily mocked tests don't give me that confidence unless there's a lot of integration tests to go with it, and I'm bad at remembering to write the integration tests so I'll just mock fewer things to begin with. 
> 
> </details>

## Write tests for `AddMovie`

While there's much to test, let's start with the following interaction:

1. The user clicks [Add Movie]
1. The user types in info about the movie
1. The user submits the form
1. Expect the `onSave` (or equivalent) prop is called with info about the movie

## Write tests for `App`

Here we'll again test entering movie information, but this time expect it to make a network request and show the movie in the All Movies section.

1. The user clicks [Add Movie]
1. The user types in info about the movie
1. The user submits the form
1. A POST network request is made to `/movies` with the movie info
1. The movie is displayed in the All Movies section

## Challenges

### Test the `useMovies` custom hook

There's a lot of great business logic in that hook! Use the `@testing-library/react-hooks` to test some of the behavior. 










