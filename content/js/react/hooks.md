## Hooks

### React Hooks

- Announced last 2018, released 2019
- The "missing piece" of React
- Source of delight and frustration

### Before Hooks...

- Previously, you *had* to have a class component to store state
- What if you wanted *just* business logic? E.g. something that loads geolocation data?
- Two patterns:
  - Higher Order Components [(link)](https://reactjs.org/docs/higher-order-components.html)
  - Render Props Components [(link)](https://reactjs.org/docs/render-props.html)

### React Hooks

- Allowed encapsulating React component business logic
- Create functions that can use React state!
- It was truly like magic

### Custom Hooks

- A JS function that starts with `use` and may call other hooks

```javascript
export const useCounter = () => {
  const [count, setCount] = useState(0)
  const increment = () => setCount(count++)
  return { count, increment }
}

// usage
const { count, increment } = useCounter()
count // 0
increment() // will update state and trigger re-render
```

### Custom Hooks

- Can take other arguments like any other function

```javascript
export const useCounter = (initialValue, step = 1) => {
  const [count, setCount] = useState(initialValue)
  const increment = () => setCount(count + step)
  return { count, increment }
}
```

### Custom Hooks

- What you return is up to you, it's the API of the hook
- Return the things you want public, hide the rest
- You could return objects, arrays, plain values, whatever!

### Custom Hooks

- Hooks state **is local to the component**
- These two React component states are independent:

```javascript
const Foo = () => {
  const { count, increment } = useCounter()
}

const Bar = () => {
  const { count, increment } = useCounter()
}
```

### Custom Hooks

- Hooks are composable

```javascript
const useCounter = () => {/* ... */}
const useByTwos = (initialValue) => {
  const { count, increment } = useCounter(initialValue, 2)
  return { count, increment }
}
```

### Custom Hooks

- Can handle async logic

```javascript
const useTodos = () => {
  const [todos, setTodos] = useState([])
  useEffect(() => {
    (async () => {
      const { data } = await axios.get('/todos')
      setTodos(data)
    })()
  }, [])
  return todos
}
```

### What can / can't you do with hooks?

- Take contents of a hook and copy them into a React component
- If the code isn't valid, neither is the hook
- Hooks follow the same rules that govern function components
  - All side effects are inside `useEffect`
- e.g. this isn't valid:

```javascript
const useTodos = async () => {
  const { data } = await axios.get('/todos')
  // ...
}
```

### Custom Hooks

- Reusable state management [(examples)](https://github.com/rehooks/awesome-react-hooks)
  - useToggle (on/off)
  - useSimpleUndo
  - useDebounce
  - useAsync (encapsulate async state machine)
  - useCopyClipboard
  - useCookie
  - useGeolocation


