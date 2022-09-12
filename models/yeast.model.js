class Yeast {
  constructor(sqlite, yeast = null) {
    this.sqlite = sqlite
    this.yeast = yeast
  }

  async createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS dyeast (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        country TEXT,
        manufacturer TEXT,
        abbreviation TEXT,
        typeFermentation TEXT,
        use TEXT,
        fermentationTemp TEXT,
        optimalFermentationTemp TEXT,
        flocculation TEXT,
        alcoholResistance TEXT,
        deleted BOOLEAN NOT NULL DEFAULT FALSE
      );
    `
    const result = await this.sqlite.run(sql)
    return result
  }

  async create() {
    const sql = `
      INSERT INTO dyeast (title, country, manufacturer, abbreviation, typeFermentation, use, fermentationTemp, optimalFermentationTemp, flocculation, alcoholResistance)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `
    const insertedId = await this.sqlite.run(sql, [
      this.yeast.title,
      this.yeast.country,
      this.yeast.manufacturer,
      this.yeast.abbreviation,
      this.yeast.typeFermentation,
      this.yeast.use,
      this.yeast.fermentationTemp,
      this.yeast.optimalFermentationTemp,
      this.yeast.flocculation,
      this.yeast.alcoholResistance
    ])
    return insertedId
  }

  async delete() {
    const sql = `
      UPDATE dyeast SET
        deleted = ?
      WHERE dyeast.id = ?;
    `
    const deletedId = await this.sqlite.run(sql, [true, this.yeast.id])
    return deletedId
  }

  async read() {
    const sql = `
      SELECT *
      FROM dyeast
      WHERE dyeast.id = ?;
    `
    const result = await this.sqlite.get(sql, [this.yeast.id])
    return result
  }

  async readAll() {
    const sql = 'SELECT * FROM dyeast WHERE NOT dyeast.deleted;'
    const result = await this.sqlite.all(sql)
    return result
  }

  async write() {
    const sql = `
      UPDATE dyeast SET
        title = ?,
        country = ?,
        manufacturer = ?,
        abbreviation = ?,
        typeFermentation = ?,
        use = ?,
        fermentationTemp = ?,
        optimalFermentationTemp = ?,
        flocculation = ?,
        alcoholResistance = ?
      WHERE dyeast.id = ?;
    `
    const updatedId = await this.sqlite.run(sql, [
      this.yeast.title,
      this.yeast.country,
      this.yeast.manufacturer,
      this.yeast.abbreviation,
      this.yeast.typeFermentation,
      this.yeast.use,
      this.yeast.fermentationTemp,
      this.yeast.optimalFermentationTemp,
      this.yeast.flocculation,
      this.yeast.alcoholResistance,
      this.yeast.id
    ])
    return updatedId
  }
}

module.exports = Yeast