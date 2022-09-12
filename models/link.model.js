const shortid = require('shortid')

class Link {
  static async create(sqlite, batch) {
    const code = shortid.generate()

    const sql = `
      INSERT INTO link (code, batch, click)
      VALUES (?, ?, ?);
    `
    const insertedId = await sqlite.run(sql, [
      code,
      batch,
      0
    ])
    return code
  }

  static async delete(sqlite, code) {
    const sql = `
      UPDATE link SET
        deleted = ?
      WHERE link.code = ?;
    `
    const deletedId = await sqlite.run(sql, [true, code])
    return deletedId
  }

  static async readByCode(sqlite, code) {
    const sql = `
      SELECT *
      FROM link
      WHERE link.code = ?;
    `
    const result = await sqlite.get(sql, [code])

    if (!result) {
      return null
    }

    const sqlUpdateLink = `
      UPDATE link SET
        click = ?
      WHERE link.id = ?;
    `
    sqlite.run(sqlUpdateLink, [
      ++result.click,
      result.id
    ])

    return result
  }

  static async readByBatch(sqlite, batch) {
    const sql = `
      SELECT *
      FROM link
      WHERE link.batch = ?;
    `
    const result = await sqlite.get(sql, [batch])

    return result
  }

  static async readAll(sqlite) {
    const sql = 'SELECT * FROM link WHERE NOT link.deleted;'
    const result = await sqlite.all(sql)
    return result
  }
}

module.exports = Link