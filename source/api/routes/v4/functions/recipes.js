const fetch = require('node-fetch');

const { insertIngredient } = require('./ingredients.js');

const selectRecipes = async (connection, recipeIDs, page, limit, sort, descending) => {
  let sql = 'SELECT recipe_id AS recipeID, title, image, servings, cooking_time AS cookingTime, instructions FROM v4_recipes';
  if (recipeIDs !== null) {
    sql += ' WHERE (';
    recipeIDs.forEach((_, index) => {
      if (index > 0) {
        sql += ' OR ';
      }
      sql += 'recipe_id=?';
    });
    sql += ')';
  }
  switch (sort) {
    case 'recipe_id':
      sql += ' ORDER BY ' + sort;
      if (!descending) {
        sql += ' ASC';
      } else {
        sql += ' DESC';
      }
      break;
  }
  sql += ' LIMIT ? OFFSET ?';
  if (recipeIDs === null) {
    return connection.query(sql, [limit, (page - 1) * limit]);
  } else {
    return connection.query(sql, [...recipeIDs, limit, (page - 1) * limit]);
  }
};

const selectFavoritedRecipes = async (connection, userID, page, limit, sort, descending) => {
  let sql = 'SELECT recipe_id AS recipeID, title, image, servings, cooking_time AS cookingTime, instructions FROM v4_recipes WHERE recipe_id IN (SELECT DISTINCT recipe_id AS recipeID FROM v4_recipe_favorites WHERE user_id=?)';
  switch (sort) {
    case 'recipe_id':
      sql += ' ORDER BY ' + sort;
      if (!descending) {
        sql += ' ASC';
      } else {
        sql += ' DESC';
      }
      break;
  }
  return connection.query(sql + ' LIMIT ? OFFSET ?', [userID, limit, (page - 1) * limit]);
};

const selectRecipeIngredients = async (connection, recipeIDs) => {
  let sql = 'SELECT ingredient_id AS ingredientID, quantity, unit FROM v4_recipe_ingredients WHERE';
  recipeIDs.forEach((_, index) => {
    if (index > 0) {
      sql += ' OR ';
    }
    sql += 'recipe_id=?';
  });
  return connection.query(sql, [...recipeIDs]);
};

const insertRecipeIngredient = async (connection, recipeID, ingredientID, quantity, unit) => {
  return connection.query('INSERT IGNORE INTO v4_recipe_ingredients (recipe_id, ingredient_id, quantity, unit) VALUES (?, ?, ?, ?)', [recipeID, ingredientID, quantity, unit]);
};

const selectRecipeFavorites = async (connection, recipeID, fridgeID) => {
  return connection.query('SELECT recipe_favorite_id AS recipeFavoriteID, user_id AS userID, favorited_ts AS favoritedTS FROM v4_recipe_favorites WHERE recipe_id=? AND user_id IN (SELECT DISTINCT user_id FROM v4_fridges WHERE fridge_id=?) ORDER BY user_id ASC', [recipeID, fridgeID])
};

const insertRecipeFavorite = async (connection, userID, recipeID) => {
  return connection.query('INSERT IGNORE INTO v4_recipe_favorites (user_id, recipe_id) VALUES (?, ?)', [userID, recipeID]);
};

const deleteRecipeFavorite = async (connection, recipeFavoriteID) => {
  return connection.query('DELETE FROM v4_recipe_favorites WHERE recipe_favorite_id=?', [recipeFavoriteID]);
};

const insertRecipe = async (connection, recipeID, title, image, servings, cookingTime, instructions, ingredients) => {
  return connection.query('INSERT IGNORE INTO v4_recipes (recipe_id, title, image, servings, cooking_time, instructions) VALUES (?, ?, ?, ?, ?, ?)', [recipeID, title, image, servings, cookingTime, instructions])
    .then((results) => {
      if (results.affectedRows > 0) {
        ingredients.forEach((item) => {
          insertIngredient(
            connection,
            item.ingredientID,
            item.name,
            item.image,
          );
          insertRecipeIngredient(
            connection,
            recipeID,
            item.ingredientID,
            item.quantity,
            item.unit,
          );
        });
      }
    });
}

const importRecipes = async (connection, recipeIDs) => {
  if (recipeIDs.length > 0) {
    // remove existing
    let sql = 'SELECT DISTINCT recipe_id AS recipeID FROM v4_recipes WHERE ';
    recipeIDs.forEach((_, index) => {
      if (index > 0) {
        sql += ' OR ';
      }
      sql += 'recipe_id=?';
    });
    await connection.query(sql, recipeIDs)
      .then((rows) => {
        if (rows.length > 0) {
          rows.forEach((recipe, index) => {
            if (index !== 'meta') {
              recipeIDs.filter((item) => item !== recipe.recipeID);
            }
          });
        }
      });
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
                    image: `https://spoonacular.com/cdn/ingredients_500x500/${item2.image}`,
                    quantity: item2.amount,
                    unit: item2.unit,
                  };
                }),
              );
            });
          }
        });
    }
  }
};

module.exports = {
  selectRecipes,
  selectFavoritedRecipes,
  selectRecipeIngredients,
  insertRecipeIngredient,
  selectRecipeFavorites,
  insertRecipeFavorite,
  deleteRecipeFavorite,
  insertRecipe,
  importRecipes,
};
