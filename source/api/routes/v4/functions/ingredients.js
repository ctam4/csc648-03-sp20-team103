const selectIngredients = (connection, ingredientIDs, page, limit) => {
  let sql = 'SELECT ingredient_id AS ingredientID, name, image FROM v4_ingredients WHERE (';
  ingredientIDs.forEach((_, index) => {
    if (index > 0) {
      sql += ' OR ';
    }
    sql += 'ingredient_id=?';
  });
  sql += ') ORDER BY ingredient_id ASC LIMIT ? OFFSET ?';
  return connection.query(sql, [...ingredientIDs, limit, (page - 1) * limit]);
};

const insertIngredient = (connection, ingredientID, name, image) => {
  return connection.query('INSERT IGNORE INTO v4_ingredients (ingredient_id, name, image) VALUES (?, ?, ?)', [ingredientID, name, image]);
};

const importIngredients = (connection, ingredients) => {
  if (ingredients.length > 0) {
    let ingredientIDs = ingredients.map((item) => {
      return item.ingredientID;
    });
    // remove existing
    let sql = 'SELECT DISTINCT ingredient_id AS ingredientID FROM v4_ingredients WHERE ';
    ingredientIDs.forEach((_, index) => {
      if (index > 0) {
        sql += ' OR ';
      }
      sql += 'ingredient_id=?';
    });
    connection.query(sql, [...ingredientIDs])
      .then(async (rows) => {
        if (rows.length > 0) {
          rows.forEach((ingredient, index) => {
            if (index !== 'meta') {
              ingredientIDs.filter((item) => item !== ingredient.ingredientID);
            }
          });
        }
        if (ingredientIDs.length > 0) {
          await Promise.all(ingredients.forEach(async (item) => {
            if (ingredientIDs.includes(item.ingredientID)) {
              await insertIngredient(
                connection,
                item.ingredientID,
                item.name,
                item.image
              );
            }
          }));
        }
      });
  }
};

module.exports = {
  selectIngredients,
  insertIngredient,
  importIngredients,
};
