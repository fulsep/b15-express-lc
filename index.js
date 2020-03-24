const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()
const cors = require('cors')

const app = express()

// Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors('*'))

const AuthMiddleware = require('./src/middleware/Auth')

app.get('/', function (req, res) {
  const data = {
    success: true,
    msg: 'Hello from Backend!'
  }
  res.send(data)
})

app.get('/migrate', function (req, res) {
  require('./src/migrations/Users')
  const data = {
    success: true,
    msg: 'Data has been migrated'
  }
  res.send(data)
})

app.use('/users/picture', express.static('files'))

// Import Router
const UserRoutes = require('./src/routes/Users')
const AuthRoutes = require('./src/routes/Auth')

// Define Routes
app.use('/users', UserRoutes)
app.use('/auth', AuthRoutes)

app.listen(process.env.APP_PORT, function () {
  console.log(`App Listen on Port ${process.env.APP_PORT}`)
})
