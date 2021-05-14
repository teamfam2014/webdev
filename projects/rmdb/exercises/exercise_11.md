# Exercise 11

- [Starting point from exercise 10 solution](https://github.com/AndrewSouthpaw/webdev/tree/exercise-10-solution/projects/rmdb)
- [Exercise 11 solution](https://github.com/AndrewSouthpaw/webdev/tree/exercise-11-solution/projects/rmdb)

## Test a simple component

Let's get started with writing a unit test for a simple component. We'll begin with `Section`, which is only presentational.

Write your tests in a `__tests__/` folder as a sibling to the file. So your directory structure would look like this:

```
- src
  |__ /__tests__
      |__ Section.test.js
  |__ Section.js
```

You should already have the testing framework set up for you. All you'll need to start testing is some imports. The `describe` and `it` keywords are provided for you globally through the Jest test runner. Here two easy tests you could write

```javascript
import { render, screen } from '@testing-library/react'

describe('MovieThumbnail', () => {
  it('should render a title and subtitle', () => {
    // ...
  })

  it('should render children passed in', () => {
    // ...
  })
})
```

## Test an element connected to the Router

The `MovieThumbnail` component would be a good candidate -- it has some props but no stateful behavior, it has buttons to click, and it renders a react-router `Link`.

Create a `MovieThumbnail.test.js` file in the `/__tests__` folder.

For this one, you'll need to wrap your component in a `Router`. Normally `App` does this for you, but since you're unit testing the `MovieThumbnail`, we're not getting that functionality from `App` right now. You can learn more about testing with `react-router` [from the docs](https://reactrouter.com/web/guides/testing).

```javascript
import { MovieThumbnail } from '../MovieThumbnail'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

describe('MovieThumbnail', () => {
  it('should render movie information and link to the movie', () => {
    render(
      <MemoryRouter>
        <MovieThumbnail propsGoHere={42} />
      </MemoryRouter>,
    )
    
    // here you should test that the movie information is displayed,
    // and the link will point to /movies/[id]
  })

  it('should render children', () => {
    // here you should test that children you pass in will be rendered.
  })

  it('should render buttons and pass movie back', () => {
    // here, you should test behavior of onAdd, onEdit, onDelete
    // and make sure they run when their corresponding buttons are clicked.
  })
})

```

## Challenges

### Test user interactions and dynamic behavior

Next up, we want to test the following business case:

```
The user should be able to edit a new movie
```

How should we go about testing this behavior?

> **🤔 Stop and think**
> 
> What exactly are we wanting to test? What do we care about? What would be observable to the user?
> 
> At what level should we be writing this test? Two obvious options would be at the `App` level or the `EditMovie` level. What would be the pros/cons of both?
> 
> <details><summary>Click here for further discussion after thinking it through</summary>

> There's a few observable behaviors:
> 
> - When a user clicks the [Edit Movie] button, a form appears with the movie information populated
> - When user types in the form, the values appear in the inputs
> - [Optional, if you did this] When the user enters a poster URL, it's loaded onto the screen
> - If a user cancels and reopens the form, the form is reset
> - If the user enters values and clicks [Save], the following happens:
>   - The form closes
>   - A network PUT request is made with the data
>   - The new information appears in All Movies section
> 
> Testing at the `App` vs. `EditMovie` component level gives you access to asserting over different sets of behavior:
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

### Write tests for `App`

Here we'll again test entering movie information, but this time expect it to make a network request and show the movie in the All Movies section.

You'll need to stub out interactions with `axios`:

```javascript
jest.mock('axios')

// describes the return values
axios.get.mockImplementation(() => Promise.resolve({ data: movies }))
axios.put.mockImplementation(() => Promise.resolve({ data: movie }))
```

1. The user clicks [Edit Movie]
1. The user edits the movie title
1. The user submits the form
1. A PUT network request is made to `/movies/[id]` with the movie info
1. The movie is displayed in the All Movies section

Finding the appropriate [Edit] button will be tricky. You can search within an element container like this:

```
import { screen, findByText } from '@testing-library/react'

screen.debug(
  getByText(screen.getByText('Movie 2'), 'Edit')
)
```

### Write tests for `EditMovie`

While there's much to test, let's start with the following interaction:

1. The user clicks [Add Movie]
1. The user types in info about the movie
1. The user submits the form
1. Expect the `onSave` (or equivalent) prop is called with info about the movie

### Test the `useMovies` custom hook

There's a lot of great business logic in that hook! Use the `@testing-library/react-hooks` to test some of the behavior. 
