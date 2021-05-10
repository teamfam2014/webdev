## Jest: Async

### Testing Asynchronous Functions

Given a (fake) server interaction:

```javascript
const users = {
  1: { id: 1, name: 'Andrew' },
  2: { id: 2, name: 'Billy' },
}

const getUser = (id) => new Promise((res, rej) => {
  process.nextTick(() => (
    users[id]
      ? res(users[id])
      : rej('User ID ' + id + ' not found.')
  ))
})
```

### Testing Asynchronous Functions (with async)

You can use an `async` callback for `it`:

```javascript
it('should handle async', async () => {
  const user = await getUser(1)
  expect(user).toEqual({ id: 1, name: 'Andrew' })
})
```

Or more tersely with `await expect(...).resolves`:

```javascript
it('should handle async', async () => {
  return await expect(getUser(1))
    .resolves.toEqual({ id: 1, name: 'Andrew' })
})
```

### Testing Asynchronous Functions (with Promises)

If `async` isn't available, you could return a promise:

```javascript
it('should handle async', () => {
  return getUser(1)
    .then((res) => {
      expect(res).toEqual({ id: 1, name: 'Andrew' })
    })
})
```

You can make it more terse with `expect(...).resolves`:

```javascript
it('should handle async', () => {
  return expect(getUser(1))
    .resolves.toEqual({ id: 1, name: 'Andrew' })
})
```

### Testing Async Dependencies

Say we're testing a function that uses our async `getUser` function indirectly:

```javascript
const getUserName = async (id) => {
  const user = await getUser(id)
  return user.name
}

it('can still await with resolves', async () => {
  return await expect(getUserName(2))
    .resolves.toEqual('Billy')
})
```

**Why does this work?**

### Testing Inaccessible Async Operations

Sometimes we do something async but don't await its result:

```javascript
it('is hard to find how to wait!', async () => {
  const mockFn = jest.fn()
  await loadUserInBackground(1, mockFn) // won't wait!
  expect(mockFn)
    .toHaveBeenCalledWith({ id: 1, name: 'Andrew' })
})

// Test output FAILURE:
//
// Expected: {"id": 1, "name": "Andrew"}
// Number of calls: 0
```

### Testing Inaccessible Async Operations

Easiest way is to force a process tick in the test.

We call it "flushing promises".

```javascript
const flushPromises = () => (
  new Promise(res => process.nextTick(res))
)
```

### Testing Inaccessible Async Operations (Example)

```javascript
it('can have promises flushed', async () => {
  const mockFn = jest.fn()
  loadUserInBackground(1, mockFn)
  await flushPromises()
  expect(mockFn)
    .toHaveBeenCalledWith({ id: 1, name: 'Andrew' })
})
```

This happens all the time in UI unit testing, e.g. with React.

### Async Error Handling

When you reject a promise and don't catch it correctly...

```javascript
it('should fail', () => {
  return getUser(42)
    .then((res) => { expect(1).toEqual(1) })
})
```

Your test will fail:

```
Error: Failed: "User ID 42 not found."
```

### Async Error Handling (with async)

You can test for error handling with `async`/`await`:

```javascript
it('should catch errors', async () => {
  try {
    await getUser(42) // assume 42 does not exist
  } catch (e) {
    expect(e).toEqual('User ID 42 not found.')
  }
})
```

### Async Error Handling (Silent Failures)

Unfortunately, if the promise *doesn't* reject, the assertion is never called!

```javascript
it('does not fail :-(', async () => {
  try {
    await getUser(1) // assume 1 does exist
  } catch (e) {
    expect(1).toEqual(0) // Still passes!
  }
})
```

### Async Error Handling (with rejects)

Safest approach is to use `expect(...).rejects`:

```javascript
it('should return error message', async () => {
  await expect(getUser(42))
    .rejects.toEqual('User ID 42 not found.')
})
```

### Async Error Handling (with rejects FTW)

This will correctly fail the test if the promise was not rejected:

```javascript
it('should fail', async () => {
  await expect(getUser(1))
    .rejects.toEqual('User ID 42 not found.')
})

// Test output:
//
// Received promise resolved instead of rejected
// Resolved to value: {"id": 1, "name": "Andrew"}
```

### Async Error Handling (thrown Errors)

If you `throw` an error, you must write a different expectation.

```javascript
const boom = async () => {
  throw new Error('kaboom')
}
```

```javascript
it('will not match :-(', async () => {
  return await expect(boom())
    .rejects.toEqual('kaboom')
})

// Test output FAILURE
// Expected: "kaboom"
// Received: [Error: kaboom]
```

### Async Error Handling (with toThrow)

Use `toThrow` instead:

```javascript
const boom = async () => {
  throw new Error('kaboom')
}

it('will match with toThrow', async () => {
  return await expect(boom())
    .rejects.toThrow('kaboom')
})
```

### Quick Note About Fake Async...

`setTimeout(cb, 0)` and `process.nextTick(cb)` are **not the same thing**.

setTimeout "takes longer" than `process.nextTick`

```javascript
const flushPromises = () => (
  new Promise(res => process.nextTick(res))
)

it('will not work', async () => {
  const mockFn = jest.fn()
  setTimeout(mockFn, 0)
  await flushPromises()
  expect(mockFn).toHaveBeenCalled() // Nope.
})
```

### Prefer process.nextTick

When possible, mock async behavior with `process.nextTick`.

Turns out `jest.useFakeTimers()` messes with `setTimeout` behavior...

```javascript
const flushPromisesSTO = () => (
  new Promise(res => setTimeout(res, 0))
)
```

### setTimeout Gets Weird

```javascript
it('does not work :-(', async () => {
  jest.useFakeTimers()
  const mockFn = jest.fn()
  setTimeout(mockFn, 0)
  await flushPromisesSTO()
  expect(mockFn).toHaveBeenCalled()
})

// Test output FAILURE:
// Timeout - Async callback was not invoked within
// the 5000ms timeout
```

### No Problems with process.nextTick

```javascript
it('does work', async () => {
  jest.useFakeTimers()
  const mockFn = jest.fn()
  process.nextTick(mockFn)
  await flushPromises()
  expect(mockFn).toHaveBeenCalled() // Yep!
})
```

Save yourself the pain and stick with `process.nextTick` when you can.

### Exercise: Handling Async Functions

  #. Open `src/www/js/jest/__tests__/async.spec.js`

  #. Do the exercises

  #. To test and debug, open

```
cd src
yarn test www/js/jest/__tests__/async.spec.js
```
