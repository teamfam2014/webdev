
// <<: async-fail-await
it('should catch errors', async () => {
  try {
    await getUser(42)
  } catch (e) {
    expect(e).toEqual('User ID 42 not found.')
  }
})
// :>>

// <<: async-fail-await-broken
it('does not fail :-(', async () => {
  try {
    await getUser(1)
  } catch (e) {
    expect(1).toEqual(0) // Still passes!
  }
})
// :>>

// <<: async-fail-rejects
it('should return error message', async () => {
  await expect(getUser(42))
    .rejects.toEqual('User ID 42 not found.')
})
// :>>

// <<: async-background
const loadUserInBackground = (id, callback) => {
  getUser(id).then(callback)
  // aka:
  // getUser(id)
  //   .then((user) => callback(user))

  return 'Done!'
}
// :>>

// <<: async-flush
const flushPromises = () => (
  new Promise(res => process.nextTick(res))
)
// :>>

// <<: async-flush-example
it('can have promises flushed', async () => {
  const mockFn = jest.fn()
  loadUserInBackground(1, mockFn)
  await flushPromises()
  expect(mockFn)
    .toHaveBeenCalledWith({ id: 1, name: 'Andrew' })
})
// :>>

// <<: boom
const boom = async () => {
  throw new Error('kaboom')
}
// :>>

// <<: boom-toThrow
it('will match with toThrow', async () => {
  return await expect(boom())
    .rejects.toThrow('kaboom')
})
// :>>
