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
  insertIngredient,
  importIngredients,
};
