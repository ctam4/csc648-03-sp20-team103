const { insertIngredient } = require('./ingredients.js');

const selectRecipes = async (connection, recipeIDs, page, limit) => {
  return await connection.query('SELECT recipe_id AS recipeID, title, image, servings, cooking_time AS cookingTime, instructions FROM v4_recipes WHERE recipe_id IN (?) ORDER BY recipe_id LIMIT ? OFFSET ?', [recipeIDs.join(', '), limit, (page - 1) * limit]);
};

const selectRecipeIngredients = async (connection, recipeID) => {
  return await connection.query('SELECT ingredient_id AS ingredientID, quantity, unit FROM v4_recipe_ingredients WHERE recipe_id=?', [recipeID.join(', ')]);
};

const insertRecipeIngredient = async (connection, recipeID, ingredientID, quantity, unit) => {
  return await connection.query('INSERT IGNORE INTO v4_recipe_ingredients (recipe_id, ingredient_id, quantity, unit) VALUES (?, ?, ?, ?)', [recipeID, ingredientID, quantity, unit]);
};

const selectRecipeFavorites = async (connection, recipeID, fridgeID) => {
  return await connection.query('SELECT recipe_favorite_id AS recipeFavoriteID, user_id AS userID, favorited_ts AS favoritedTS FROM v4_recipe_favorites WHERE recipe_id=? AND user_id IN (SELECT DISTINCT user_id FROM v4_fridges WHERE fridge_id=?) ORDER BY user_id ASC', [recipeID, fridgeID])
};

const insertRecipeFavorite = async (connection, userID, recipeID) => {
  return await connection.query('INSERT IGNORE INTO v4_recipe_favorites (user_id, recipe_id) VALUES (?, ?)', [userID, recipeID]);
};

const deleteRecipeFavorite = async (connection, recipeFavoriteID) => {
  return await connection.query('DELETE FROM v4_recipe_favorites WHERE recipe_favorite_id=?', [recipeFavoriteID]);
};

const insertRecipe = async (connection, recipeID, title, image, servings, cookingTime, instructions, ingredients) => {
  return await connection.query('INSERT IGNORE INTO v4_recipes (recipe_id, title, image, servings, cooking_time, instructions) VALUES (?, ?, ?, ?, ?, ?)', [recipeID, title, image, servings, cookingTime, instructions])
    .then(async (results) => {
      if (results.affectedRows > 0) {
        ingredients.forEach((item) => {
          insertIngredient(
            connection,
            item.ingredientID,
            item.name,
            item.image,
          )
            .then(async (results2) => {
              if (results2.affectedRows > 0) {
                insertRecipeIngredient(
                  connection,
                  recipeID,
                  item.ingredientID,
                  item.quantity,
                  item.unit,
                );
              }
            });
        });
      }
    });
}

const importRecipes = async (connection, recipeIDs) => {
  if (recipeIDs.length > 0) {
    await fetch('https://api.spoonacular.com/recipes/informationBulk?ids=' + recipeIDs.join(',') + '&includeNutrition=true&apiKey=bd1784451bab4f47ac234225bd2549ee', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('error ' + res.status);
        }
        return res.json();
      })
      .then((data) => {
        if (data.length > 0) {
          data.forEach((item) => {
            insertRecipe(
              connection,
              item.id,
              item.title,
              item.image,
              item.servings,
              item.readyInMinutes,
              item.instructions,
              item.extendedIngredients.map((item2) => {
                return {
                  ingredientID: item2.id,
                  name: item2.name,
                  image: item2.image,
                  quantity: item2.amount,
                  unit: item2.unit,
                };
              }),
            );
          });
        }
      });
  }
};

module.exports = {
  selectRecipes,
  selectRecipeIngredients,
  insertRecipeIngredient,
  selectRecipeFavorites,
  insertRecipeFavorite,
  deleteRecipeFavorite,
  insertRecipe,
  importRecipes,
};
