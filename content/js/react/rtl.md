## React Testing Library

### Simulating a Browser Environment

React runs in a browser. But we don't want to use a real browser for unit tests.

Enter **jsdom**: https://github.com/jsdom/jsdom

It lets you simulate most of a browser environment in a Node runtime environment.

```javascript
import { JSDOM } from 'jsdom'

const dom = new JSDOM(`<p>Hello world</p>`)
dom.window.document
  .querySelector('p').textContent // "Hello world"
```

### React Testing Library

- Two very popular testing libraries:
  - `enzyme`
  - `react-testing-library`

**enzyme** came first, gives you a lot of control, makes it easy to get "under the hood" and test implementation

**react-testing-library** came later, limits your control, focuses on testing behavior

### Setup

- Comes bundled with create-react-app scaffolding
- Or follow instructions here [(link)](https://testing-library.com/docs/react-testing-library/intro)

### Rendering your component

```javascript
import { render, screen } from '@testing-library/react'

const Component = () => (<div>Hello world</div>)

it('should render the component', () => {
  render(<Component/>)
  screen.debug()
})
```

### Finding elements

Use `getByText` with a string or RegEx

```javascript
render(<Component/>)
const el = screen.getByText('Hello world')
expect(el).toBeInTheDocument()
expect(screen.getByText(/Hello/)).toBeInTheDocument()
```

### Finding elements

Throws an error when text is not found

```javascript
screen.getByText('Not here') // Error
```

### Querying elements

- Use `queryByText` to not fail when none are found
- Good for asserting something is not in the document

```javascript
expect(screen.queryByText('Not here'))
  .not.toBeInTheDocument()
```

### Waiting for async

- Use `findByText` to wait for text to eventually appear

```javascript
const App = () => {
  const [state, setState] = useState()
  useEffect(() => {
    setTimeout(() => { setState('yay') }, 100)
  })
  return (<p>{state}</p>)
}

it('should foo', async () => {
  render(<App/>)
  // screen.getByText('yay') <-- would fail 
  await screen.findByText('yay')
})
```

### Variants

There's a handful of other options in `getBy*:

- `LabelText`: `<label for="..." />`
- `PlaceholderText`: `<input placeholder="..." />`
- `AltText`: `<img alt="..." />`
- `DisplayValue`: `<input value="..." />`

These apply to `queryBy` and `findBy` as well.

### Finding multiple elements

You also get:

- `getAllBy`
- `queryAllBy`
- `findAllBy`

### Asserting

There's a long list [(link)](https://github.com/testing-library/jest-dom#table-of-contents), but here's some popular
ones:

- `toBeInTheDocument`
- `toHaveValue` / `toHaveDisplayValue`
- `toBeChecked`
- `toBeEnabled` / `toBeDisabled`

### Events

Use `userEvent.type` to simulate typing:

```javascript
await userEvent.type(
  screen.getByRole('textbox'),
  'Hello'
)
```

### Events

Or `userEvent.click` to simulate clicking:

```javascript
await userEvent.click(screen.getByRole('button'))
```

### Testing Callbacks

Create stubs with `jest.fn()` and pass in as props

```javascript
const stub = jest.fn()
render(<input onChange={stub}/>)
fireEvent.change(
  screen.getByRole('textbox'),
  { target: { value: 'Hello' } }
)
expect(stub).toHaveBeenCalled()
```

### Mocking axios

The easiest way is with `jest.mock`:

```javascript
jest.mock('axios')

it('should mock axios', async () => {
  axios.get.mockImplementation(() => (
    Promise.resolve('yo')
  ))
  await expect(axios.get()).resolves.toEqual('yo')
})
```

### Mocking axios

You could do similarly for a failure:

```javascript
axios.get.mockImplementationOnce(() => (
  Promis.reject('error')
))
```

### Async interactions

Combine `userEvents` with `findBy` calls:

```javascript
await userEvent.click(screen.getByRole('button'))
const results = await screen.findAllByRole('listitem')
expect(results).toEqual(['Item 1', 'Item 2'])
```

### Async interactions

- What if you're not waiting for an HTML element to appear?

```javascript
const App = () => {
  const [done, setDone] = useState(false)
  const onClick = async () => {
    await Promise.resolve()
    setDone(true)
  }
  return (
    <button onClick={onClick} disabled={done}>Click me</button>
  )
}
```

### Async interactions

- Using `findBy` will still flush most of your promises

```javascript
it('should allow flushing promises', async () => {
  render(<App />)
  await userEvent.click(screen.getByText('Click me'))
  expect(await screen.findByText('Click me')).toBeDisabled()
})
```

### Waiting for promises to finish

- Sometimes you'll get an error like this:

```javascript
it('should allow flushing promises', async () => {
  render(<App />)
  await userEvent.click(screen.getByText('Click me'))
  expect(screen.getByText('Click me')).toBeInTheDocument()
})

// Warning: An update to App inside a test was 
// not wrapped in act(...).
// When testing, code that causes React state 
// updates should be wrapped into act(...)
```

### Waiting for promises to finish

- Typically happens when you aren't waiting for all promises to resolve

```javascript
it('should allow flushing promises', async () => {
  render(<App />)
  await userEvent.click(screen.getByText('Click me'))
  expect(screen.getByText('Click me')).toBeInTheDocument()
  // <-- code exits, we're no longer wrapping in `act`, and then
  //     that promise resolves and updates state
})
```

### Waiting for promises to finish

- Use `findBy` to flush things, or try using `flushPromises`
- Wrap in `await act(...)`, otherwise React will complain
- RTL wraps your `userEvent` and `fireEvent` with `act` for you

```javascript
const flushPromises = () => (
  new Promise(res => process.nextTick(res))
)

it('should allow flushing promises', async () => {
  render(<App />)
  await userEvent.click(screen.getByText('Click me'))
  await act(() => flushPromises())
  expect(screen.getByText('Click me')).toBeInTheDocument()
})
```

### Waiting for promises to finish

- `act` gives you greater control over the flow of your test
- Let's say the button sleeps for `100ms`
- You can tell your test to sleep that long too

```javascript
it('should allow flushing promises', async () => {
  render(<App />)
  await userEvent.click(screen.getByText('Click me'))
  await act(() => sleep(101))
  expect(screen.getByText('Click me')).toBeInTheDocument()
})
```

### Waiting for promises to finish

- But better yet, fake timers with Jest instead
- Then your test doesn't actually wait

```javascript
it('should allow flushing promises', async () => {
  jest.useFakeTimers()
  render(<App />)
  await userEvent.click(screen.getByText('Click me'))
  act(() => jest.advanceTimersByTime(1000))
  await act(flushPromises)
  expect(screen.getByText('Click me')).toBeInTheDocument()
})
```

### Waiting for promises to finish

- `await act(flushPromises)` and `await findBy...` are basically the same

```javascript
it('should allow flushing promises', async () => {
  jest.useFakeTimers()
  render(<App />)
  await userEvent.click(screen.getByText('Click me'))
  act(() => jest.advanceTimersByTime(1000))
  // await act(flushPromises)
  expect(await screen.findByText('Click me')).toBeInTheDocument()
})
```

### Testing React Hooks

- Use `@testing-library/react-hooks`

```javascript
import { renderHook, act } from '@testing-library/react-hooks'
import useCounter from './useCounter'

it('should increment counter', () => {
  const { result } = renderHook(() => useCounter())

  act(() => result.current.increment())

  expect(result.current.count).toBe(1)
})
```
