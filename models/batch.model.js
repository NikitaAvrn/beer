class Batch {
  constructor(sqlite, batch = null) {
    this.sqlite = sqlite
    this.batch = batch
  }

  async create() {
    const sql = `
      INSERT INTO batch (
        recipe,
        dateStart,
        dateFermentation,
        dateCorbonization,
        dateBottling,
        dateReady,
        dateFinish,
        primer,
        waterStart,
        waterWash,
        volume,
        malt,
        comment
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `
    const insertedId = await this.sqlite.run(sql, [
      this.batch.recipe,
      this.batch.dateStart,
      this.batch.dateFermentation,
      this.batch.dateCorbonization,
      this.batch.dateBottling,
      this.batch.dateReady,
      this.batch.dateFinish,
      this.batch.primer,
      this.batch.waterStart,
      this.batch.waterWash,
      this.batch.volume,
      this.batch.malt,
      this.batch.comment
    ])
    return insertedId
  }

  async delete() {
    const sql = `
      UPDATE batch SET
        deleted = ?
      WHERE batch.id = ?;
    `
    const deletedId = await this.sqlite.run(sql, [true, this.batch.id])
    return deletedId
  }

  async read() {
    const sql = `
      SELECT *
      FROM batch
      WHERE batch.id = ?;
    `
    const result = await this.sqlite.get(sql, [this.batch.id])
    return result
  }

  async readAll() {
    const sql = `
      SELECT batch.*, recipe.title as titleRecipe, link.code as link
      FROM batch 
      INNER JOIN recipe ON batch.recipe = recipe.id
      INNER JOIN link ON link.batch = batch.id
      WHERE NOT batch.deleted;
    `
    const result = await this.sqlite.all(sql)
    return result
  }

  async update() {
    const sql = `
      UPDATE batch SET
        recipe = ?,
        dateStart = ?,
        dateFermentation = ?,
        dateCorbonization = ?,
        dateBottling = ?,
        dateReady = ?,
        dateFinish = ?,
        primer = ?,
        waterStart = ?,
        waterWash = ?,
        volume = ?,
        malt = ?,
        comment = ?
      WHERE batch.id = ?;
    `
    const updatedId = await this.sqlite.run(sql, [
      this.batch.recipe,
      this.batch.dateStart,
      this.batch.dateFermentation,
      this.batch.dateCorbonization,
      this.batch.dateBottling,
      this.batch.dateReady,
      this.batch.dateFinish,
      this.batch.primer,
      this.batch.waterStart,
      this.batch.waterWash,
      this.batch.volume,
      this.batch.malt,
      this.batch.comment,
      this.batch.id
    ])
    return updatedId
  }
}

module.exports = Batch