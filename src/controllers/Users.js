const UserModel = require('../models/Users')
const bcrypt = require('bcryptjs')

module.exports = {
  read: async function (req, res) {
    let { page, limit, search, sort } = req.query
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5

    let key = search && Object.keys(search)[0]
    let value = search && Object.values(search)[0]
    search = (search && { key, value }) || { key: 'id', value: '' }

    key = sort && Object.keys(sort)[0]
    value = sort && Object.values(sort)[0]
    sort = (sort && { key, value }) || { key: 'id', value: 1 }
    const conditions = { page, perPage: limit, search, sort }

    // if (req.user.roleId !== 1) {
    //   const data = {
    //     success: false,
    //     msg: 'You\'re not allowed to access this feature'
    //   }
    //   res.send(data)
    // }
    const results = await UserModel.getAllUsers(conditions)
    results.forEach(function (o, i) {
      results[i].picture = process.env.APP_USER_PICTURE_URI.concat(results[i].picture)
    })
    conditions.totalData = await UserModel.getTotalUsers(conditions)
    conditions.totalPage = Math.ceil(conditions.totalData / conditions.perPage)
    conditions.nextLink = (page >= conditions.totalPage ? null : process.env.APP_URI.concat(`users?page=${page + 1}`))
    conditions.prevLink = (page <= 1 ? null : process.env.APP_URI.concat(`users?page=${page - 1}`))
    delete conditions.search
    delete conditions.sort
    delete conditions.limit

    const data = {
      success: true,
      data: results,
      pageInfo: conditions
    }
    res.send(data)
  },
  get: async function (req, res) {
    const data = {
      success: true,
      data: await UserModel.getUserById(req.params.id)
    }
    res.send(data)
  },
  create: async function (req, res) {
    // if user upload a picture
    const picture = (req.file && req.file.filename) || null

    // get username and password from req.body object
    const { username, password } = req.body

    // make encrypted password
    const encryptedPassword = bcrypt.hashSync(password)

    // insert data into database with model
    const results = await UserModel.createUser(picture, username, encryptedPassword)

    // delete password from req.body object
    delete req.body.password
    const data = {
      success: true,
      msg: `User ${username} has been created`,
      data: { id: results, ...req.body }
    }
    res.send(data)
  },
  update: async function (req, res) {
    console.log(req.body)
    const picture = (req.file && req.file.filename) || null
    const { id } = req.params
    const { username, password } = req.body
    const encryptedPassword = bcrypt.hashSync(password)
    const results = await UserModel.updateUser(id, picture, username, encryptedPassword)
    delete req.body.password
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
