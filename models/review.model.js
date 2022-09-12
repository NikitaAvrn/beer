class Review {
  constructor(sqlite, review = null) {
    this.sqlite = sqlite
    this.review = review
  }

  async create() {
    const sql = `
      INSERT INTO review (batch, name, email, message, response)
      VALUES (?, ?, ?, ?, ?);
    `
    const insertedId = await this.sqlite.run(sql, [
      this.review.batch,
      this.review.name,
      this.review.email,
      this.review.message,
      this.review.response
    ])

    return insertedId
  }

  async delete() {
    const sql = `
      UPDATE review SET
        deleted = ?
      WHERE review.id = ?;
    `
    const deletedId = await this.sqlite.run(sql, [true, this.review.id])
    return deletedId
  }

  async read() {
    const sql = `
      SELECT *
      FROM review
      WHERE review.id = ?;
    `
    const result = await this.sqlite.get(sql, [this.review.id])
    return result
  }

  async readAll() {
    const sql = `
      SELECT *
      FROM review
      WHERE NOT review.deleted AND review.batch = ?;
    `
    const result = await this.sqlite.all(sql, [
      this.review.batch
    ])
    return result
  }

  async write() {
    const sql = `
      UPDATE review SET
        batch = ?,
        name = ?,
        email = ?,
        message = ?
      WHERE review.id = ?;
    `
    const updatedId = await this.sqlite.run(sql, [
      this.review.batch,
      this.review.name,
      this.review.email,
      this.review.message
    ])
    return updatedId
  }
}

module.exports = Review