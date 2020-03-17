const Auth = require('express').Router()
const AuthController = require('../controllers/Auth')

Auth.post('/login', AuthController.login)
Auth.post('/register', AuthController.register)
Auth.get('/verify', AuthController.verify)
Auth.post('/forgot-password', AuthController.forgotPassword)

module.exports = Auth
