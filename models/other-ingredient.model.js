class OtherIngredient {
  constructor(sqlite, otherIngredient = null) {
    this.sqlite = sqlite
    this.otherIngredient = otherIngredient
  }

  async createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS dotherIngredient (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        country TEXT,
        manufacturer TEXT,
        extractivity TEXT,
        color TEXT,
        deleted BOOLEAN NOT NULL DEFAULT FALSE
      );
    `
    const result = await this.sqlite.run(sql)
    return result
  }

  async create() {
    const sql = `
      INSERT INTO dotherIngredient (title, country, manufacturer, extractivity, color)
      VALUES (?, ?, ?, ?, ?);
    `
    const insertedId = await this.sqlite.run(sql, [
      this.otherIngredient.title,
      this.otherIngredient.country,
      this.otherIngredient.manufacturer,
      this.otherIngredient.extractivity,
      this.otherIngredient.color,
    ])
    return insertedId
  }

  async delete() {
    const sql = `
      UPDATE dotherIngredient SET
        deleted = ?
      WHERE dotherIngredient.id = ?;
    `
    const deletedId = await this.sqlite.run(sql, [true, this.otherIngredient.id])
    return deletedId
  }

  async read() {
    const sql = `
      SELECT *
      FROM dotherIngredient
      WHERE dotherIngredient.id = ?;
    `
    const result = await this.sqlite.get(sql, [this.otherIngredient.id])
    return result
  }

  async readAll() {
    const sql = 'SELECT * FROM dotherIngredient WHERE NOT dotherIngredient.deleted;'
    const result = await this.sqlite.all(sql)
    return result
  }

  async write() {
    const sql = `
      UPDATE dotherIngredient SET
        title = ?,
        country = ?,
        manufacturer = ?,
        extractivity = ?,
        color = ?
      WHERE dotherIngredient.id = ?;
    `
    const updatedId = await this.sqlite.run(sql, [
      this.otherIngredient.title,
      this.otherIngredient.country,
      this.otherIngredient.manufacturer,
      this.otherIngredient.extractivity,
      this.otherIngredient.color,
      this.otherIngredient.id
    ])
    return updatedId
  }
}

module.exports = OtherIngredient