const config = require('config')
const sqlite3 = require('sqlite3').verbose()

const DB_NAME = config.get('database')

class SQLiteDB {
  constructor () {
    this.db = new sqlite3.Database(DB_NAME, (err) => {
      if (err) {
        console.log('При соединении к базе данных произошла ошибка.')
      } else {
        console.log('Подключение к базе данных прошло успешно.')
      }
    })
  }

  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function (err) {
        if (err) {
          console.log('Error running SQL `' + sql + '`')
          console.log(err)
          reject(err)
        } else {
          resolve({ id: this.lastID })
        }
      })
    })
  }

  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, result) => {
        if (err) {
          console.log('Error running SQL `' + sql + '`')
          console.log(err)
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }

  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          console.log('Error running SQL `' + sql + '`')
          console.log(err)
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }

  close() {
    this.db.close((err) => {
      if (err) {
        console.log('При разрыве соединения с базой данных произошла ошибка.')
      } else {
        console.log('Отключения от базы данных прошло успешно.')
      }
    })
  }
}

module.exports = {
  SQLiteDB
}