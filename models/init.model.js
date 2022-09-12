class Init {
  constructor(sqlite) {
    this.sqlite = sqlite
  }

  init() {
    this.hop()
    this.malt()
    this.yeast()
    this.otherIngredient()
    this.recipe()
    this.batch()
    this.links()
    this.review()
    this.likes()
    this.dislikes()
    this.user()
    
    //this.list()
  }

  async user() {
  const sql = `
    CREATE TABLE IF NOT EXISTS duser (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      password TEXT,
      deleted BOOLEAN NOT NULL DEFAULT FALSE
    );
  `
  const result = await this.sqlite.run(sql)
  return result 
  }

  async review() {
    const sql = `
      CREATE TABLE IF NOT EXISTS review (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        batch INTEGER,
        user INTEGER NOT NULL DEFAULT 0,
        response INTEGER NOT NULL DEFAULT 0,
        name TEXT,
        email TEXT,
        date DATE NOT NULL DEFAULT (date('now', 'localtime')),
        message TEXT,
        deleted BOOLEAN NOT NULL DEFAULT FALSE
      );
    `
    const result = await this.sqlite.run(sql)
    return result
  }

  async likes() {
    const sql = `
      CREATE TABLE IF NOT EXISTS likes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        review INTEGER,
        user INTEGER
      );
    `
    const result = await this.sqlite.run(sql)
    return result
  }

  async dislikes() {
    const sql = `
      CREATE TABLE IF NOT EXISTS dislikes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        review INTEGER,
        user INTEGER
      );
    `
    const result = await this.sqlite.run(sql)
    return result
  }

  async links() {
    const sql = `
      CREATE TABLE IF NOT EXISTS link (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        batch INTEGER,
        code TEXT,
        click INTEGER,
        deleted BOOLEAN NOT NULL DEFAULT FALSE
      );
    `
    const result = await this.sqlite.run(sql)
    return result
  }

  async batch() {
    const sql = `
      CREATE TABLE IF NOT EXISTS batch (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        recipe INTEGER,
        dateStart DATE,
        dateFermentation DATE,
        dateCorbonization DATE,
        dateBottling DATE,
        dateReady DATE,
        dateFinish DATE,
        primer TEXT,
        malt REAL,
        waterStart REAL,
        waterWash REAL,
        volume REAL,
        comment TEXT,
        deleted BOOLEAN NOT NULL DEFAULT FALSE
      );
    `
    const result = await this.sqlite.run(sql)
    return result    
  }

  async recipe() {
    const sqlRecipe = `
      CREATE TABLE IF NOT EXISTS recipe (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        efficiency INTEGER,
        boil INTEGER,
        hydromodule REAL,
        startExtractivity REAL,
        finishExtractivity REAL,
        abv REAL,
        ibu REAL,
        description TEXT,
        primer TEXT,
        temperature REAL,
        co2 REAL,
        deleted BOOLEAN NOT NULL DEFAULT FALSE
      );
    `
    const sqlMalt = `
      CREATE TABLE IF NOT EXISTS malt (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        recipe INTEGER,
        malt INTEGER,
        weight REAL,
        color REAL,
        extractivity REAL,
        entry TEXT,
        deleted BOOLEAN NOT NULL DEFAULT FALSE
      );
    `
    const sqlHop = `
      CREATE TABLE IF NOT EXISTS hop (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        recipe INTEGER,
        hop INTEGER,
        weight REAL,
        alpha REAL,
        type TEXT,
        entry TEXT,
        time REAL,
        deleted BOOLEAN NOT NULL DEFAULT FALSE
      );
    `
    const sqlYeast = `
      CREATE TABLE IF NOT EXISTS yeast (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        recipe INTEGER,
        yeast INTEGER,
        temperature REAL,
        fermentation TEXT,
        attenuation REAL,
        deleted BOOLEAN NOT NULL DEFAULT FALSE
      );
    `
    const sqlOther = `
      CREATE TABLE IF NOT EXISTS other (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        recipe INTEGER,
        other INTEGER,
        entry TEXT,
        weight REAL,
        time REAL,
        deleted BOOLEAN NOT NULL DEFAULT FALSE
      );
    `
    const sqlPause = `
      CREATE TABLE IF NOT EXISTS pause (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        recipe INTEGER,
        name TEXT,
        heat TEXT,
        temperature INTEGER,
        time INTEGER,
        deleted BOOLEAN NOT NULL DEFAULT FALSE
      );
    `
    this.sqlite.run(sqlRecipe)
    this.sqlite.run(sqlMalt)
    this.sqlite.run(sqlHop)
    this.sqlite.run(sqlYeast)
    this.sqlite.run(sqlOther)
    this.sqlite.run(sqlPause)
  }

  async hop() {
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

  async malt() {
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

  async otherIngredient() {
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

  async yeast() {
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

  async list() {
    const sql = `
      CREATE TABLE IF NOT EXISTS dlist (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        type TEXT,
        deleted BOOLEAN NOT NULL DEFAULT FALSE
      );
    `
    const result = await this.sqlite.run(sql)
    
    const insert = [
      "INSERT INTO dlist (title, type) VALUES ('Декстроза', 'primer');",
      "INSERT INTO dlist (title, type) VALUES ('Сухой экстракт', 'primer');",
      "INSERT INTO dlist (title, type) VALUES ('Мёд', 'primer');",
      "INSERT INTO dlist (title, type) VALUES ('Сусло', 'primer');",
      "INSERT INTO dlist (title, type) VALUES ('Сахароза', 'primer');",

      "INSERT INTO dlist (title, type) VALUES ('Главное брожение', 'yeast');",
      "INSERT INTO dlist (title, type) VALUES ('Вторичное брожение', 'yeast');",

      "INSERT INTO dlist (title, type) VALUES ('Кипячение', 'hop0');",
      "INSERT INTO dlist (title, type) VALUES ('Сухое охмеление', 'hop0');",
      "INSERT INTO dlist (title, type) VALUES ('Вирпул', 'hop0');",

      "INSERT INTO dlist (title, type) VALUES ('Гранулы', 'hop1');",
      "INSERT INTO dlist (title, type) VALUES ('Шишковой', 'hop1');",

      "INSERT INTO dlist (title, type) VALUES ('Кислотная', 'pause0');",
      "INSERT INTO dlist (title, type) VALUES ('Белковая', 'pause0');",
      "INSERT INTO dlist (title, type) VALUES ('Мальтозная', 'pause0');",
      "INSERT INTO dlist (title, type) VALUES ('Осахаривания', 'pause0');",
      "INSERT INTO dlist (title, type) VALUES ('Декстриновая', 'pause0');",
      "INSERT INTO dlist (title, type) VALUES ('Мэш-аут', 'pause0');",

      "INSERT INTO dlist (title, type) VALUES ('Прямой', 'pause1');",
      "INSERT INTO dlist (title, type) VALUES ('Доливка', 'pause1');",
      "INSERT INTO dlist (title, type) VALUES ('Отварка', 'pause1');",

      "INSERT INTO dlist (title, type) VALUES ('Кипячение', 'other');",
      "INSERT INTO dlist (title, type) VALUES ('Затирание', 'other');",
      "INSERT INTO dlist (title, type) VALUES ('Брожение', 'other');",
      "INSERT INTO dlist (title, type) VALUES ('Вирпул', 'other');",
      "INSERT INTO dlist (title, type) VALUES ('Розлив', 'other');",

      "INSERT INTO dlist (title, type) VALUES ('Начало затирания', 'malt');",
      "INSERT INTO dlist (title, type) VALUES ('Конец затирания', 'malt');",
      "INSERT INTO dlist (title, type) VALUES ('Мэш-аут', 'malt');",
      "INSERT INTO dlist (title, type) VALUES ('Промывка', 'malt');",
      "INSERT INTO dlist (title, type) VALUES ('Отварить', 'malt');",
    ]

    insert.forEach(i => {
      this.sqlite.run(i)
    })
  }
}

module.exports = Init