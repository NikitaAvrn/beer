class List {
  constructor(sqlite, type = null) {
    this.sqlite = sqlite
    this.type = type
  }

  async readAll() {
    const sql = `SELECT * FROM dlist WHERE (NOT dlist.deleted) AND (dlist.type = ?);`
    const result = await this.sqlite.all(sql, [this.type])
    return result
  }
}

module.exports = List