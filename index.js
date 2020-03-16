const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express()

// Import Router
const UserRoutes = require('./src/routes/Users')

// Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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

// Define Routes
app.use('/users', UserRoutes)

app.listen(process.env.APP_PORT, function () {
  console.log(`App Listen on Port ${process.env.APP_PORT}`)
})
