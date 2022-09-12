class Hop {
  constructor(sqlite, hop = null) {
    this.sqlite = sqlite
    this.hop = hop
  }

  async createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS dhop (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        country TEXT,
        manufacturer TEXT,
        alpha TEXT,
        fragrance TEXT,
        bitter BOOLEAN,
        aroma BOOLEAN,
        deleted BOOLEAN NOT NULL DEFAULT FALSE
      );
    `
    const result = await this.sqlite.run(sql)
    return result
  }

  async create() {
    const sql = `
      INSERT INTO dhop (title, country, manufacturer, alpha, fragrance, bitter, aroma)
      VALUES (?, ?, ?, ?, ?, ?, ?);
    `
    const insertedId = await this.sqlite.run(sql, [
      this.hop.title,
      this.hop.country,
      this.hop.manufacturer,
      this.hop.alpha,
      this.hop.fragrance,
      this.hop.bitter,
      this.hop.aroma
    ])
    return insertedId
  }

  async delete() {
    const sql = `
      UPDATE dhop SET
        deleted = ?
      WHERE dhop.id = ?;
    `
    const deletedId = await this.sqlite.run(sql, [true, this.hop.id])
    return deletedId
  }

  async read() {
    const sql = `
      SELECT *
      FROM dhop
      WHERE dhop.id = ?;
    `
    const result = await this.sqlite.get(sql, [this.hop.id])
    return result
  }

  async readAll() {
    const sql = 'SELECT * FROM dhop WHERE NOT dhop.deleted;'
    const result = await this.sqlite.all(sql)
    return result
  }

  async write() {
    const sql = `
      UPDATE dhop SET
        title = ?,
        country = ?,
        manufacturer = ?,
        alpha = ?,
        fragrance = ?,
        bitter = ?,
        aroma = ?
      WHERE dhop.id = ?;
    `
    const updatedId = await this.sqlite.run(sql, [
      this.hop.title,
      this.hop.country,
      this.hop.manufacturer,
      this.hop.alpha,
      this.hop.fragrance,
      this.hop.bitter,
      this.hop.aroma,
      this.hop.id
    ])
    return updatedId
  }
}

module.exports = Hop