module.exports = (req, res, next) => {
  const slowdown = process.env.SLOWDOWN
  if (!slowdown) return next()

  console.log(`Simulating a slow server with ${slowdown}ms latency`)
  setTimeout(next, slowdown)
}
