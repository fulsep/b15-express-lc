const db = require('../utils/db')

module.exports = {
  getAllUsers: function () {
    const table = 'users'
    return new Promise(function (resolve, reject) {
      db.query(`SELECT * FROM ${table}`, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  },
  createUser: function (picture, username, password) {
    const table = 'users'
    return new Promise(function (resolve, reject) {
      db.query(`INSERT INTO ${table} (picture, username, password) VALUES ('${picture}','${username}', '${password}')`, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results.insertId)
        }
      })
    })
  },
  updateUser: function (id, username, password) {
    const table = 'users'
    return new Promise(function (resolve, reject) {
      db.query(`UPDATE ${table} SET username='${username}', password='${password}' WHERE id=${id}`, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          if (results.affectedRows) {
            resolve(true)
          } else {
            resolve(false)
          }
        }
      })
    })
  },
  deleteUser: function (id) {
    const table = 'users'
    return new Promise(function (resolve, reject) {
      db.query(`DELETE FROM ${table} WHERE id=${id}`, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          if (results.affectedRows) {
            resolve(true)
          } else {
            resolve(false)
          }
        }
      })
    })
  }
}
