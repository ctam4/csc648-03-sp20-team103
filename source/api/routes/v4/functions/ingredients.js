const selectIngredients = async (connection, ingredientIDs, page, limit) => {
  return await connection.query('SELECT ingredient_id AS ingredientID, name, image FROM v4_ingredients WHERE ingredient_id IN (?) ORDER BY ingredient_id LIMIT ? OFFSET ?', [ingredientIDs.join(', '), limit, (page - 1) * limit]);
};

const insertIngredient = async (connection, ingredientID, name, image) => {
  return await connection.query('INSERT IGNORE INTO v4_ingredients (ingredient_id, name, image) VALUES (?, ?, ?)', [ingredientID, name, image]);
};

const importIngredients = (connection, ingredients) => {
  if (ingredients.length > 0) {
    let ingredientIDs = [];
    ingredients.forEach((item) => {
      insertIngredient(
        connection,
        item.ingredientID,
        item.name,
        item.image
      )
      .then((results) => {
        if (results.affectedRows > 0) {
          ingredientIDs.push(item.ingredientID);
        }
      });
    });
    return ingredientIDs;
  }
};

module.exports = {
  selectIngredients,
  insertIngredient,
  importIngredients,
};
