const jwt = require('jsonwebtoken')

module.exports = {
  checkAuthToken: function (req, res, next) {
    const { authorization } = req.headers
    if (authorization && authorization.startsWith('Bearer')) {
      let token = authorization.slice(7, authorization.length)
      try {
        token = jwt.verify(token, process.env.APP_KEY)
        if (token) {
          req.user = token
          next()
        } else {
          const data = {
            success: false,
            msg: 'Unauthorized!'
          }
          res.send(data)
        }
      } catch (err) {
        const data = {
          success: false,
          msg: err.message
        }
        res.send(data)
      }
    } else {
      const data = {
        success: false,
        msg: 'Authorization needed'
      }
      res.send(data)
    }
  }
}
