## Class Components

### Writing a Component (Class Component)

* You can also write a component as a **class**.
* Only way to get *all* the awesomeness of React
* No longer the case thanks to **hooks**
* Still extremely common

### Writing a Component (Class Component)

A **class component** extends `React.Component` and has a `render` method

```javascript
class Greeting extends React.Component {
  render() { /* ... */ }
}
```

### Writing a Component (Class Component)

The `render` method returns JSX to be rendered (just like the **function component**)

```javascript
class Greeting extends React.Component {
  render() { 
    return (
      <h1>Hello world</h1>
    )
  }
}
```

### Props (Class Components)

* The same rules govern **class components**
* Only different: you read off `this.props`

```javascript
class Greeting extends React.Component {
  render() {
    const { className, message } = this.props
    return (
      <div className={className}>
        {message}
      </div>
    )
  }
}
```

