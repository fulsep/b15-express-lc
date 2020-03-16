const UserModel = require('../models/Users')

module.exports = {
  read: async function (req, res) {
    const results = await UserModel.getAllUsers()
    results.forEach(function (o, i) {
      results[i].picture = process.env.APP_USER_PICTURE_URI.concat(results[i].picture)
    })
    const data = {
      success: true,
      data: results
    }
    res.send(data)
  },
  create: async function (req, res) {
    const picture = req.file.filename
    const { username, password } = req.body
    const results = await UserModel.createUser(picture, username, password)

    const data = {
      success: true,
      msg: `User ${username} has been created`,
      data: { id: results, ...req.body }
    }
    res.send(data)
  },
  update: async function (req, res) {
    const { id } = req.params
    const { username, password } = req.body
    const results = await UserModel.updateUser(id, username, password)
    if (results) {
      const data = {
        success: true,
        msg: `User with id ${id} has been updated!`,
        data: { id, ...req.body }
      }
      res.send(data)
    } else {
      const data = {
        success: false,
        msg: 'There is no data can be updated'
      }
      res.send(data)
    }
  },
  delete: async function (req, res) {
    const { id } = req.params
    const results = await UserModel.deleteUser(id)
    if (results) {
      const data = {
        success: true,
        msg: `Users with id ${id} has been deleted!`
      }
      res.send(data)
    } else {
      const data = {
        success: false,
        msg: 'There is no data can be deleted'
      }
      res.send(data)
    }
  }
}
