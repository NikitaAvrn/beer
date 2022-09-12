const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('../middleware/auth.middleware')

class Auth {
  constructor(sqlite, user) {
    this.sqlite = sqlite
    this.user = user
  }
  static async login(sqlite, email, password) {
    const sql = `
      SELECT *
      FROM duser
      WHERE duser.email = ? AND duser.password = ? AND NOT duser.deleted;
    `
    let user = await sqlite.get(sql, [
      email,
      password
    ])

    if (!user) {
      return {
        error: 'Неверный логин и/или пароль'
      }
    } 
    delete user.password
    const token = jwt.sign(
      {
        userId: user.id
      },
      config.get('jwtSecret'),
      {
        expiresIn: '1h'
      }
    )

    return {
      ...user,
      token
    }
  }
}

module.exports = Auth