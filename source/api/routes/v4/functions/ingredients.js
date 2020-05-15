const selectIngredients = async (connection, ingredientIDs, page, limit) => {
  return await connection.query('SELECT ingredient_id AS ingredientID, name, image FROM v4_ingredients WHERE ingredient_id IN (?) ORDER BY ingredient_id ASC LIMIT ? OFFSET ?', [ingredientIDs.join(','), limit, (page - 1) * limit]);
};

const insertIngredient = async (connection, ingredientID, name, image) => {
  return await connection.query('INSERT IGNORE INTO v4_ingredients (ingredient_id, name, image) VALUES (?, ?, ?)', [ingredientID, name, image]);
};

const importIngredients = (connection, ingredients) => {
  if (ingredients.length > 0) {
    const ingredientIDs = ingredients.map((item) => {
      insertIngredient(
        connection,
        item.ingredientID,
        item.name,
        item.image
      );
      return item.ingredientID;
    });
    return ingredientIDs;
  }
  return [];
};

module.exports = {
  selectIngredients,
  insertIngredient,
  importIngredients,
};
