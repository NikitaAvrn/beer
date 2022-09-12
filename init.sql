/* Создание таблиц */
/* Солод */
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
/* Хмель */
CREATE TABLE IF NOT EXISTS dhop (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  country TEXT,
  manufacturer TEXT,
  alpha REAL,
  fragrance TEXT,
  bitter BOOLEAN,
  aroma BOOLEAN,
  deleted BOOLEAN NOT NULL DEFAULT FALSE
);
/* Дрожжи */
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
/* Другие ингредиенты */
CREATE TABLE IF NOT EXISTS dyeast (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  country TEXT,
  manufacturer TEXT,
  extractivity TEXT,
  color TEXT,
  deleted BOOLEAN NOT NULL DEFAULT FALSE
);
CREATE TABLE IF NOT EXISTS dlist (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  type TEXT,
  deleted BOOLEAN NOT NULL DEFAULT FALSE
);
INSERT INTO dlist (title, type)
VALUES ('Декстроза', 'primer');
INSERT INTO dlist (title, type)
VALUES ('Сахароза', 'primer');
INSERT INTO dlist (title, type)
VALUES ('Сухой экстракт', 'primer');
INSERT INTO dlist (title, type)
VALUES ('Мёд', 'primer');
INSERT INTO dlist (title, type)
VALUES ('Сусло', 'primer');
INSERT INTO dlist (title, type)
VALUES ('Главное брожение', 'yeast');
INSERT INTO dlist (title, type)
VALUES ('Вторичное брожение', 'yeast');
INSERT INTO dlist (title, type)
VALUES ('Кипячение', 'hop0');
INSERT INTO dlist (title, type)
VALUES ('Сухое охмеление', 'hop0');
INSERT INTO dlist (title, type)
VALUES ('Вирпул', 'hop0');
INSERT INTO dlist (title, type)
VALUES ('Гранулы', 'hop1');
INSERT INTO dlist (title, type)
VALUES ('Шишковой', 'hop1');
INSERT INTO dlist (title, type)
VALUES ('Кислотная', 'pause0');
INSERT INTO dlist (title, type)
VALUES ('Белковая', 'pause0');
INSERT INTO dlist (title, type)
VALUES ('Мальтозная', 'pause0');
INSERT INTO dlist (title, type)
VALUES ('Осахаривания', 'pause0');
INSERT INTO dlist (title, type)
VALUES ('Декстриновая', 'pause0');
INSERT INTO dlist (title, type)
VALUES ('Мэш-аут', 'pause0');
INSERT INTO dlist (title, type)
VALUES ('Прямой', 'pause1');
INSERT INTO dlist (title, type)
VALUES ('Доливка', 'pause1');
INSERT INTO dlist (title, type)
VALUES ('Отварка', 'pause1');
INSERT INTO dlist (title, type)
VALUES ('Кипячение', 'other');
INSERT INTO dlist (title, type)
VALUES ('Затирание', 'other');
INSERT INTO dlist (title, type)
VALUES ('Брожение', 'other');
INSERT INTO dlist (title, type)
VALUES ('Вирпул', 'other');
INSERT INTO dlist (title, type)
VALUES ('Розлив', 'other');
INSERT INTO dlist (title, type)
VALUES ('Начало затирания', 'malt');
INSERT INTO dlist (title, type)
VALUES ('Конец затирания', 'malt');
INSERT INTO dlist (title, type)
VALUES ('Мэш-аут', 'malt');
INSERT INTO dlist (title, type)
VALUES ('Промывка', 'malt');
INSERT INTO dlist (title, type)
VALUES ('Отварить', 'malt');