//Date Header
const dateMsg = "Featured for "
const today = new Date().toLocaleDateString('en-CA').split('/')

const DateHeader = () => (
  <h4>{dateMsg + today}</h4>
)

export {DateHeader}