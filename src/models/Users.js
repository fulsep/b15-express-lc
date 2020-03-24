const db = require('../utils/db')

module.exports = {
  getUserById: function (id) {
    return new Promise(function (resolve, reject) {
      const sql = `SELECT * FROM users WHERE id=${id}`
      console.log(sql)
      db.query(sql, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results[0])
        }
      })
    })
  },
  getAllUsers: function (conditions = {}) {
    let { page, perPage, sort, search } = conditions
    page = page || 1
    perPage = perPage || 5
    sort = sort || { key: 'id', value: 1 }
    search = search || { key: 'username', value: '' }
    const table = 'users'
    return new Promise(function (resolve, reject) {
      const sql = `
      SELECT * FROM ${table}
      WHERE ${search.key} LIKE '${search.value}%'
      ORDER BY ${sort.key} ${sort.value ? 'ASC' : 'DESC'}
      LIMIT ${perPage} OFFSET ${(page - 1) * perPage}`
      console.log(sql)
      db.query(sql, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  },
  getTotalUsers: function (conditions = {}) {
    let { search } = conditions
    search = search || { key: 'username', value: '' }
    const table = 'users'
    return new Promise(function (resolve, reject) {
      const sql = `
      SELECT COUNT (*) AS total FROM ${table}
      WHERE ${search.key} LIKE '${search.value}%'`
      console.log(sql)
      db.query(sql, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results[0].total)
        }
      })
    })
  },
  createUser: function (picture, username, password, roleId) {
    const table = 'users'
    roleId = roleId || 3
    picture = (typeof picture === 'string' ? `'${picture}'` : picture)
    return new Promise(function (resolve, reject) {
      db.query(`INSERT INTO ${table} (picture, username, password, role_id) VALUES (${picture},'${username}', '${password}', ${roleId})`, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results.insertId)
        }
      })
    })
  },
  updateUser: function (id, picture, username, password) {
    const table = 'users'
    picture = (typeof picture === 'string' ? `'${picture}'` : picture)
    return new Promise(function (resolve, reject) {
      db.query(`UPDATE ${table} SET picture=${picture}, username='${username}', password='${password}' WHERE id=${id}`, function (err, results, fields) {
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
