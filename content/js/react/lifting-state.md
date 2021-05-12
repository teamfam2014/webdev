## Lifting State

### Making a Toggle Component

```javascript
const Switch = () => {
  const [on, setOn] = useState(false)
  return (
    <button onClick={() => { setOn(!on) }}>
      {on ? 'On' : 'Off'}
    </button>
  )
}

export const App = () => (
  <div className="App">
    <Switch />
    {/* when on, display message */}
  </div>
)
```

### Making a Toggle Component

Q:  How does `App` know about the "on" state of `Switch`?

### Lifting State

* Common occurrence: parent needs to know what the child is doing
* Two approaches:
  * Parent asks what child is doing
  * Parent tells what child is doing
  
### Making a Toggle Component

* Could ask `Switch` what its state is...
  * Strongly discouraged by React
  * Harder to debug, comprehend, or refactor
  * Often accomplished through `ref`s
* Better approach: "lift state up" 

### Making a Toggle Component

```javascript
const Switch = ({ on, onChange }) => (
  <button onClick={() => { onChange(!on) }}>
    {on ? 'On' : 'Off'}
  </button>
)

export const App = () => {
  const [on, setOn] = useState(false)
  return (
    <div className="App">
      <Switch on={on} onChange={setOn} />
      {on && (<p>Powered on!</p>)}
    </div>
  )
}
```

### Making a Toggle Component

Visualization: [(link)](http://localhost:3000/js/react/one-way-data/index.html)

### Encapsulating some logic

Too much logic up top:

```javascript
const Counter = ({ count, onClick }) => (
  <button onClick={onClick}>{count}</button>
)

export const App = () => {
  const [count, setCount] = useState(0)
  const max = 5
  const increment = () => {
    if (count >= max) return
    setCount(count + 1)
  }
  return (
    <div className="App">
      <Counter count={count} max={max} onClick={increment} />
    </div>
  )
}
```

### Encapsulating some logic

```javascript
const Counter = ({ count, onClick, max }) => {
  const handleClick = () => {
    if (count >= max) return
    onClick(count + 1)
  }
  return (
    <button onClick={handleClick}>{count}</button>
  )
}

export const App = () => {
  const [count, setCount] = useState(0)
  const max = 5
  return (
    <div className="App">
      <Counter count={count} max={max} onClick={setCount} />
    </div>
  )
}
```

### Encapsulating some logic

- Key takeaway: lift **state** up, keep business logic down

### Exercise

**Exercise 1**: [(link)](https://codesandbox.io/s/floral-cherry-7jxr0?file=/src/App.js)

**Exercise 2**: [(link)](https://codesandbox.io/s/clever-edison-3w28g?file=/src/App.js)
