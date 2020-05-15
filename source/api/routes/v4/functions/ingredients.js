const selectIngredients = async (connection, ingredientIDs, page, limit) => {
  return await connection.query('SELECT ingredient_id AS ingredientID, name, image FROM v4_ingredients WHERE ingredient_id IN (?) ORDER BY ingredient_id ASC LIMIT ? OFFSET ?', [ingredientIDs.join(','), limit, (page - 1) * limit]);
};

const insertIngredient = async (connection, ingredientID, name, image) => {
  return await connection.query('INSERT IGNORE INTO v4_ingredients (ingredient_id, name, image) VALUES (?, ?, ?)', [ingredientID, name, image]);
};

const importIngredients = (connection, ingredients) => {
  if (ingredients.length > 0) {
    let ingredientIDs = ingredients.map((item) => {
      return item.ingredientID;
    });
    // remove existing
    await connection.query('SELECT DISTINCT ingredient_id AS ingredientID FROM v4_ingredients WHERE ingredient_id IN (?)', [ingredientIDs])
      .then((rows) => {
        if (rows.length > 0) {
          rows.forEach((ingredient, index) => {
            if (index !== 'meta') {
              ingredientIDs.pop(ingredient.ingredientID);
            }
          });
        }
      });
    if (ingredientIDs.length > 0) {
      ingredients.forEach((item) => {
        if (ingredientIDs.includes(item.ingredientID)) {
          insertIngredient(
            connection,
            item.ingredientID,
            item.name,
            item.image
          );
        }
      });
    }
  }
};

module.exports = {
  selectIngredients,
  insertIngredient,
  importIngredients,
};
