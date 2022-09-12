class Malt {
  constructor(sqlite, malt = null) {
    this.sqlite = sqlite
    this.malt = malt
  }

  async createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS dmalt (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        country TEXT,
        manufacturer TEXT,
        protein REAL,
        kolbach REAL,
        extractivity REAL,
        differenceExtract REAL,
        diastaticStrength REAL,
        viscosity REAL,
        colorBoiling REAL,
        color REAL,
        humidity REAL,
        deleted BOOLEAN NOT NULL DEFAULT FALSE
      );
    `
    const result = await this.sqlite.run(sql)
    return result
  }

  async create() {
    const sql = `
      INSERT INTO dmalt (title, country, manufacturer, protein, kolbach, extractivity, differenceExtract, diastaticStrength, viscosity, colorBoiling, color, humidity)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `
    const insertedId = await this.sqlite.run(sql, [
      this.malt.title,
      this.malt.country,
      this.malt.manufacturer,
      this.malt.protein,
      this.malt.kolbach,
      this.malt.extractivity,
      this.malt.differenceExtract,
      this.malt.diastaticStrength,
      this.malt.viscosity,
      this.malt.colorBoiling,
      this.malt.color,
      this.malt.humidity
    ])
    return insertedId
  }

  async delete() {
    const sql = `
      UPDATE dmalt SET
        deleted = ?
      WHERE dmalt.id = ?;
    `
    const deletedId = await this.sqlite.run(sql, [true, this.malt.id])
    return deletedId
  }

  async read() {
    const sql = `
      SELECT *
      FROM dmalt
      WHERE dmalt.id = ?;
    `
    const result = await this.sqlite.get(sql, [this.malt.id])
    return result
  }

  async readAll() {
    const sql = 'SELECT * FROM dmalt WHERE NOT dmalt.deleted;'
    const result = await this.sqlite.all(sql)
    return result
  }

  async write() {
    const sql = `
      UPDATE dmalt SET
        title = ?,
        country = ?,
        manufacturer = ?,
        protein = ?,
        kolbach = ?,
        extractivity = ?,
        differenceExtract = ?,
        diastaticStrength = ?,
        viscosity = ?,
        colorBoiling = ?,
        color = ?,
        humidity = ?
      WHERE dmalt.id = ?;
    `
    const updatedId = await this.sqlite.run(sql, [
      this.malt.title,
      this.malt.country,
      this.malt.manufacturer,
      this.malt.protein,
      this.malt.kolbach,
      this.malt.extractivity,
      this.malt.differenceExtract,
      this.malt.diastaticStrength,
      this.malt.viscosity,
      this.malt.colorBoiling,
      this.malt.color,
      this.malt.humidity,
      this.malt.id
    ])
    return updatedId
  }
}

module.exports = Malt