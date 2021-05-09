const policy = require('../www/js/security/csp/cspPolicy')

module.exports = (req, res, next) => {
  // matches a request for one of the HTML files for the course, e.g. http://localhost:3000/js/
  if (req.path.startsWith('/js/security/csp')) {
    // res.header('Content-Security-Policy', policy)
  }

  next()
}
