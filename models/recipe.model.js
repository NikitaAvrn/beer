class Recipe {
  constructor(sqlite, recipe = null) {
    this.sqlite = sqlite
    this.recipe = recipe
  }

  async createRecipe() {
    const sql = `
      INSERT INTO recipe (
        title,
        efficiency,
        boil,
        hydromodule,
        startExtractivity,
        finishExtractivity,
        abv,
        ibu,
        description,
        primer,
        temperature,
        co2
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `
    const insertedId = await this.sqlite.run(sql, [
      this.recipe.title,
      this.recipe.efficiency,
      this.recipe.boil,
      this.recipe.hydromodule,
      this.recipe.startExtractivity,
      this.recipe.finishExtractivity,
      this.recipe.abv,
      this.recipe.ibu,
      this.recipe.description,
      this.recipe.primer,
      this.recipe.temperature,
      this.recipe.co2
    ])
    return insertedId
  }

  createMalt() {
    const sql = `
      INSERT INTO malt (
        recipe,
        malt,
        weight,
        color,
        extractivity,
        entry
      )
      VALUES (?, ?, ?, ?, ?, ?);
    `
    this.recipe.malt.forEach(malt => {
      if (malt.id) {
        return
      }
      this.sqlite.run(sql, [
        this.recipe.id,
        malt.malt,
        malt.weight,
        malt.color,
        malt.extractivity,
        malt.entry,
      ])
    })
  }

  createHop() {
    const sql = `
      INSERT INTO hop (
        recipe,
        hop,
        weight,
        alpha,
        type,
        entry,
        time
      )
      VALUES (?, ?, ?, ?, ?, ?, ?);
    `
    this.recipe.hop.forEach(hop => {
      if (hop.id) {
        return
      }
      this.sqlite.run(sql, [
        this.recipe.id,
        hop.hop,
        hop.weight,
        hop.alpha,
        hop.type,
        hop.entry,
        hop.time,
      ])
    })
  }

  createYeast() {
    const sql = `
      INSERT INTO yeast (
        recipe,
        yeast,
        temperature,
        fermentation,
        attenuation
      )
      VALUES (?, ?, ?, ?, ?);
    `
    this.recipe.yeast.forEach(yeast => {
      if (yeast.id) {
        return
      }
      this.sqlite.run(sql, [
        this.recipe.id,
        yeast.yeast,
        yeast.temperature,
        yeast.fermentation,
        yeast.attenuation
      ])
    })
  }

  createOther() {
    const sql = `
      INSERT INTO other (
        recipe,
        other,
        entry,
        weight,
        time
      )
      VALUES (?, ?, ?, ?, ?);
    `
    this.recipe.otherIngredient.forEach(other => {
      if (other.id) {
        return
      }
      this.sqlite.run(sql, [
        this.recipe.id,
        other.other,
        other.entry,
        other.weight,
        other.time
      ])
    })
  }

  createPause() {
    const sql = `
      INSERT INTO pause (
        recipe,
        name,
        heat,
        temperature,
        time
      )
      VALUES (?, ?, ?, ?, ?);
    `
    this.recipe.pauseTemp.forEach(pause => {
      if (pause.id) {
        return
      }
      this.sqlite.run(sql, [
        this.recipe.id,
        pause.name,
        pause.heat,
        pause.temperature,
        pause.time
      ])
    })
  }

  async create() {
    const recipeId = await this.createRecipe()
    this.recipe.id = recipeId.id

    //
    this.createMalt()
    this.createHop()
    this.createYeast()
    this.createOther()
    this.createPause()
    return recipeId
  }
  
  async readAll() {
    const sql = `
      SELECT recipe.*, count(batch.id) as brewingBeer
      FROM recipe
      LEFT JOIN batch
      ON batch.recipe=recipe.id AND NOT batch.deleted
      WHERE NOT recipe.deleted
      GROUP BY recipe.id;
    `
    const result = await this.sqlite.all(sql)
    return result
  }

  async deleteRecipe() {
    const sql = `
      UPDATE recipe SET
        deleted = ?
      WHERE recipe.id = ?;
    `
    const deletedId = await this.sqlite.run(sql, [true, this.recipe.id])
    return deletedId
  }

  async readRecipe() {
    const sqlList = [
      { name:'malt', sql: 'SELECT malt.*, dmalt.title as maltTitle FROM malt INNER JOIN dmalt ON malt.malt = dmalt.id WHERE malt.recipe = ?;'},
      { name:'hop', sql: 'SELECT hop.*, dhop.title as hopTitle FROM hop INNER JOIN dhop ON hop.hop = dhop.id WHERE hop.recipe = ?;'},
      { name:'otherIngredient', sql: 'SELECT other.*, dotherIngredient.title as otherTitle FROM other INNER JOIN dotherIngredient ON other.other = dotherIngredient.id WHERE other.recipe = ?;'},
      { name:'yeast', sql: 'SELECT yeast.*, dyeast.title as yeastTitle FROM yeast INNER JOIN dyeast ON yeast.yeast = dyeast.id WHERE yeast.recipe = ?;'},
      { name:'pauseTemp', sql: 'SELECT * FROM pause WHERE pause.recipe = ?;'},
    ]

    const sqlRecipe = 'SELECT * FROM recipe WHERE recipe.id = ?;'
    let recipe = await this.sqlite.get(sqlRecipe, [this.recipe.id])

    await Promise.all(
      sqlList.map(async (request) => {
        recipe[request.name] = await this.sqlite.all(request.sql, [this.recipe.id])
      })
    )
    return recipe
  }

  async updateRecipe() {
    const sql = `
      UPDATE recipe SET
        title = ?,
        efficiency = ?,
        boil = ?,
        hydromodule = ?,
        startExtractivity = ?,
        finishExtractivity = ?,
        abv = ?,
        ibu = ?,
        description = ?,
        primer = ?,
        temperature = ?,
        co2 = ?
      WHERE recipe.id = ?;
    `
    const updatedId = await this.sqlite.run(sql, [
      this.recipe.title,
      this.recipe.efficiency,
      this.recipe.boil,
      this.recipe.hydromodule,
      this.recipe.startExtractivity,
      this.recipe.finishExtractivity,
      this.recipe.abv,
      this.recipe.ibu,
      this.recipe.description,
      this.recipe.primer,
      this.recipe.temperature,
      this.recipe.co2,
      this.recipe.id
    ])
    return updatedId
  }

  async updateMalt() {
    //удаляем все чего нет в пришедшем массиве
    const sqlAllMalt = 'SELECT id FROM malt WHERE malt.recipe = ?;'
    const allMalt = await this.sqlite.all(sqlAllMalt, [this.recipe.id])
    allMalt.forEach(am => {
      if (!this.recipe.malt.find(f => f.id === am.id)) {
        const sqlDelMalt = 'DELETE FROM malt WHERE malt.id = ?;'
        this.sqlite.run(sqlDelMalt, [am.id])
      }
    })
    //записываем чего не существует
    this.createMalt()
    //обновляем что было
    this.recipe.malt.forEach(m => {
      if (m.id) {
        const sqlUpdateMalt = `
          UPDATE malt SET
            malt = ?,
            weight = ?,
            color = ?,
            extractivity = ?,
            entry = ?
          WHERE id = ?;
        `
        this.sqlite.run(sqlUpdateMalt, [
          m.malt,
          m.weight,
          m.color,
          m.extractivity,
          m.entry,
          m.id
        ])
      } 
    })
  }

  async updateHop() {
    //удаляем все чего нет в пришедшем массиве
    const sqlAllHop = 'SELECT id FROM hop WHERE hop.recipe = ?;'
    const allHop = await this.sqlite.all(sqlAllHop, [this.recipe.id])
    allHop.forEach(ah => {
      if (!this.recipe.hop.find(f => f.id === ah.id)) {
        const sqlDelHop = 'DELETE FROM hop WHERE hop.id = ?;'
        this.sqlite.run(sqlDelHop, [ah.id])
      }
    })
    //записываем чего не существует
    this.createHop()
    //обновляем что было
    this.recipe.hop.forEach(h => {
      if (h.id) {
        const sqlUpdateHop = `
          UPDATE hop SET
            hop = ?,
            weight = ?,
            alpha = ?,
            type = ?,
            entry = ?,
            time = ?
          WHERE id = ?;
        `
        this.sqlite.run(sqlUpdateHop, [
          h.hop,
          h.weight,
          h.alpha,
          h.type,
          h.entry,
          h.time,
          h.id
        ])
      } 
    })
  }

  async updateYeast() {
    //удаляем все чего нет в пришедшем массиве
    const sqlAllYeast = 'SELECT id FROM yeast WHERE yeast.recipe = ?;'
    const allYeast = await this.sqlite.all(sqlAllYeast, [this.recipe.id])
    allYeast.forEach(ay => {
      if (!this.recipe.yeast.find(f => f.id === ay.id)) {
        const sqlDelYeast = 'DELETE FROM yeast WHERE yeast.id = ?;'
        this.sqlite.run(sqlDelYeast, [ay.id])
      }
    })
    //записываем чего не существует
    this.createYeast()
    //обновляем что было
    this.recipe.yeast.forEach(y => {
      if (y.id) {
        const sqlUpdateYeast = `
          UPDATE yeast SET
            yeast = ?,
            temperature = ?,
            fermentation = ?,
            attenuation = ?
          WHERE id = ?;
        `
        this.sqlite.run(sqlUpdateYeast, [
          y.yeast,
          y.temperature,
          y.fermentation,
          y.attenuation,
          y.id
        ])
      } 
    })
  }

  async updateOther() {
    //удаляем все чего нет в пришедшем массиве
    const sqlAllOther = 'SELECT id FROM other WHERE other.recipe = ?;'
    const allOther = await this.sqlite.all(sqlAllOther, [this.recipe.id])
    allOther.forEach(ao => {
      if (!this.recipe.otherIngredient.find(f => f.id === ao.id)) {
        const sqlDelOther = 'DELETE FROM other WHERE other.id = ?;'
        this.sqlite.run(sqlDelOther, [ao.id])
      }
    })
    //записываем чего не существует
    this.createOther()
    //обновляем что было
    this.recipe.otherIngredient.forEach(o => {
      if (o.id) {
        const sqlUpdateOther = `
          UPDATE other SET
            other = ?,
            entry = ?,
            weight = ?,
            time = ?
          WHERE id = ?;
        `
        this.sqlite.run(sqlUpdateOther, [
          o.other,
          o.entry,
          o.weight,
          o.time,
          o.id
        ])
      } 
    })
  }  

  async updatePause() {
    //удаляем все чего нет в пришедшем массиве
    const sqlAllPause = 'SELECT id FROM pause WHERE pause.recipe = ?;'
    const allPause = await this.sqlite.all(sqlAllPause, [this.recipe.id])
    allPause.forEach(ap => {
      if (!this.recipe.pauseTemp.find(f => f.id === ap.id)) {
        const sqlDelPause = 'DELETE FROM pause WHERE pause.id = ?;'
        this.sqlite.run(sqlDelPause, [ap.id])
      }
    })
    //записываем чего не существует
    this.createPause()
    //обновляем что было
    this.recipe.pauseTemp.forEach(p => {
      if (p.id) {
        const sqlUpdatePause = `
          UPDATE pause SET
            name = ?,
            heat = ?,
            temperature = ?,
            time = ?
          WHERE id = ?;
        `
        this.sqlite.run(sqlUpdatePause, [
          p.name,
          p.heat,
          p.temperature,
          p.time,
          p.id
        ])
      } 
    })
  }  

  async update() {
    this.updateRecipe()
    this.updateMalt()
    this.updateHop()
    this.updateYeast()
    this.updateOther()
    this.updatePause()
  }
}

module.exports = Recipe