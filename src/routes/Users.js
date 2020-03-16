const Users = require('express').Router()
const multer = require('multer')
const storage = multer.diskStorage({
  destination: 'files/',
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})
const upload = multer({ storage })

const UserControllers = require('../controllers/Users')

Users.get('/', UserControllers.read)

Users.post('/', upload.single('picture'), UserControllers.create)

Users.patch('/:id', upload.single('picture'), UserControllers.update)

Users.delete('/:id', UserControllers.delete)

module.exports = Users
