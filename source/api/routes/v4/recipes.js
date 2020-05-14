const express = require('express');
const recipes = express.Router();
const fetch = require("node-fetch");

const pool = require('../../database.js');
let connection;

const { insertRecipe, importRecipes } = require('./functions/recipes.js');

/**
 * GET /v4/recipes/search
 * @description Retrieve recipes list of current fridges with session.
 * @param {string} session
 * @param {string} query
 * @param {integer} page (optional)
 * @param {integer} limit (optional)
 * @returns {object[]} recipes
 */

recipes.get('/search', async (req, res) => {
  // check correct params
  if ((Object.keys(req.query).length == 2 ||
    (Object.keys(req.query).length == 4 && !('page' in req.query && 'limit' in req.query))) &&
    !('session' in req.query && 'query' in req.query)) {
    res.sendStatus(400).end();
    return;
  }
  // check params data type
  let session, query, page, limit;
  try {
    if (typeof req.query.session !== 'string' || (req.query.sort && typeof req.query.sort !== 'string')) {
      throw new TypeError();
    }
    session = req.query.session;
    query = req.query.query;
    page = (req.query.page && parseInt(req.query.page)) || 1;
    limit = (req.query.limit && parseInt(req.query.limit)) || 20;
  } catch (error) {
    res.sendStatus(400).end();
    throw error;
  }
  // check params data range
  if (session.length !== 36 || query.length === 0 || page <= 0 || limit <= 0) {
    res.sendStatus(400).end();
    return;
  }
  // run query to mariadb
  try {
    connection = await pool.getConnection();
    // retrieve fridge_id
    await connection.query('SELECT 1 FROM v4_sessions WHERE session=?', [session])
      .then(async (rows) => {
        if (rows.length > 0) {
          // retrieve for endpoint
          await fetch('https://api.spoonacular.com/recipes/search?query=' + query + '&number=' + limit + '&apiKey=a71257d9f31f4ee2af88be4615153f31', {
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
                const recipeIDs = data.map((item) => {
                  return item.id
                });
                importRecipes(recipeIDs);
                // @todo: select and return
                // res.json().end();
              } else {
                res.sendStatus(406).end();
              }
            });
        } else {
          res.sendStatus(401).end();
        }
      });
  } catch (error) {
    res.sendStatus(500).end();
    throw error;
  } finally {
    if (connection) {
      connection.release(); // release to pool
    }
  }
});

// recipes.get('/', async (req, res) => {
//     try {
//         connection = await pool.getConnection();
//         let sql = 'SELECT * FROM v3_ingredients';
//         await connection.query(sql)
//             .then((results) => {
//                 res.send(JSON.stringify(results)).end();
//                 // res.json(results).end();
//             });
//     } catch (error) {
//         res.sendStatus(500).end();
//         throw error;
//     } finally {
//         if (connection) {
//             connection.release(); // release to pool
//         }
//     }
// });

/**
 * GET /v4/recipes
 * @description Retreives recipe information given their IDs.
 * @param {integer(,integer)} recipeIDs
 * @returns {object[]} recipes
 */
recipes.get('/', async (req, res) => {
  // check correct params
  if (Object.keys(req.query).length !== 2 || !('session' in req.query) || !('recipeIDs' in req.query)) {
    res.sendStatus(400).end();
    return;
  }
  // check params data type
  let session, recipeIDs;
  try {
    if (typeof req.query.session !== 'string' || typeof req.query.recipeIDs !== 'string') {
      throw new TypeError();
    }
    session.req.query.session;
    recipeIDs = req.query.recipeIDs.split(',').map(value => parseInt(value));
  } catch (error) {
    res.sendStatus(400).end();
    throw error;
  }
  // check params data range
  if (session.length !== 36 || recipeIDs.length === 0 || !recipeIDs.every(value => !isNaN(value) && value > 0)) {
    res.sendStatus(400).end();
    return;
  }
  // run query to mariadb
  try {
    connection = await pool.getConnection();
    await connection.query('SELECT 1 FROM v3_sessions WHERE session=?', [session])
      .then(async (rows) => {
        if (rows.length > 0) {
          await connection.query('SELECT recipe_id AS recipeID, title, image, servings, cooking_time AS cookingTime, instructions FROM v3_recipes WHERE recipe_id IN (?) ORDER BY recipe_id', [recipeIDs.join(', ')])
            .then(async (rows2) => {
              if (rows2.length > 0) {
                // console.log(rows2);
                const recipes = await Promise.all(rows2.map(async (recipe, index) => {
                  if (index !== 'meta') {
                    await connection.query('SELECT ingredient_id AS ingredientID, quantity, unit FROM v3_recipe_ingredients WHERE recipe_id=?', [recipe.recipeID])
                      .then(async (rows3) => {
                        if (rows3.length > 0) {
                          recipe.ingredients = rows3.filter((ingredient, index2) => index2 !== 'meta');
                          // console.log(recipe.ingredients);
                        }
                        // console.log(recipe, "HEREE");
                      });
                    return recipe

                  }
                }));
                // console.log(recipes);
                res.json(recipes).end();
              } else {
                res.sendStatus(406).end();
              }
            });
        } else {
          res.sendStatus(401).end();
        }
      });
  } catch (error) {
    res.sendStatus(500).end();
    throw error;
  } finally {
    if (connection) {
      connection.release(); // release to pool
    }
  }
});

/**
 * POST /v4/recipes/favorite
 * @description Insert inventory for current fridges with session.
 * @param {integer} user_id
 * @param {integer} recipe_id
 * @returns {interger} inventoryID
 */
recipes.post('/favorites', async (req, res) => {

  // check params data type
  let session, ingredientID, expirationDate, quantity, unit, price, state;
  try {
    user_id = parseInt(req.body.user_id);
    recipe_id = parseInt(req.body.recipe_id);
    session = req.query.session;
  } catch (error) {
    res.sendStatus(400).end();
    throw error;
  }
  // run query to mariadb
  try {
    connection = await pool.getConnection();
    await connection.query('SELECT 1 FROM v3_sessions WHERE session=?', [session])
      .then(async (rows) => {
        if (rows.length > 0) {
          await connection.query('INSERT INTO v3_recipe_favorites (user_id, recipe_id) VALUES (?, ?)', [user_id, recipe_id])
            .then((results) => {
              res.send({
                ...results,
                user_id: user_id,
                recipe_id: recipe_id
              }).end();
              // res.json(results).end();
            });
        } else {
          res.sendStatus(401).end();
        }
      })
  } catch (error) {
    res.sendStatus(500).end();
    throw error;
  } finally {
    if (connection) {
      connection.release(); // release to pool
    }
  }
});

/**
 * POST /v4/recipes/favorite
 * @description Insert inventory for current fridges with session.
 * @param {integer} user_id
 * @param {integer} recipe_id
 * @returns {interger} inventoryID
 */
recipes.delete('/favorites', async (req, res) => {

  // check params data type
  let session, ingredientID, expirationDate, quantity, unit, price, state;
  try {
    user_id = parseInt(req.body.user_id);
    recipe_id = parseInt(req.body.recipe_id);
    session = req.query.session;
  } catch (error) {
    res.sendStatus(400).end();
    throw error;
  }

  // run query to mariadb
  try {
    connection = await pool.getConnection();
    await connection.query('SELECT 1 FROM v3_sessions WHERE session=?', [session])
      .then(async (rows) => {
        if (rows.length > 0) {
          await connection.query('DELETE FROM v3_recipe_favorites WHERE user_id=?', [user_id])
            .then((results) => {
              res.send({
                ...results,
                user_id: user_id,
                recipe_id: recipe_id
              }).end();
              // res.json(results).end();
            });
        } else {
          res.sendStatus(401).end();
        }
      })
  } catch (error) {
    res.sendStatus(500).end();
    throw error;
  } finally {
    if (connection) {
      connection.release(); // release to pool
    }
  }
});

/**
 * GET /v4/recipes/favorites
 * @description Retrieve recipes list of current fridges with session.
 * @param {string} session
 * @param {string} query
 * @param {integer} page (optional)
 * @param {integer} limit (optional)
 * @returns {object[]} recipeID
 */
recipes.get('/favorites', async (req, res) => {
  // check params data type
  if ((Object.keys(req.query).length == 3 ||
    (Object.keys(req.query).length == 4 && !('page' in req.query && 'limit' in req.query))) &&
    !('session' in req.query && 'query' in req.query)) {
    res.sendStatus(400).end();
    return;
  }
  // check params data type
  let session, query, page, limit, userID;
  try {
    session = req.query.session;
    query = req.query.query;
    userID = req.query.userID;
    page = (req.query.page && parseInt(req.query.page)) || 1;
    limit = (req.query.limit && parseInt(req.query.limit)) || 20;
  } catch (error) {
    res.sendStatus(400).end();
    throw error;
  }
  // check params data range
  if (!session || page <= 0 || limit <= 0) {
    res.sendStatus(400).end();
    return;
  }

  // run query to mariadb
  try {
    connection = await pool.getConnection();
    await connection.query('SELECT 1 AS fridgeID FROM v3_sessions WHERE session=?', [session])
      .then(async (rows) => {
        if (rows.length > 0) {
          let sql = 'SELECT recipe_id AS recipeID FROM v3_recipe_favorites WHERE user_id=?';
          await connection.query(sql + ' LIMIT ? OFFSET ?', [userID, limit, (page - 1) * limit])
            .then((rows) => {
              if (rows.length > 0) {
                // res.send(JSON.stringify(rows)).end();
                res.json(rows).end();
              } else {
                res.sendStatus(406).end();
              }
            });

        } else {
          res.sendStatus(401).end();
        }
      })
  } catch (error) {
    res.sendStatus(500).end();
    throw error;
  } finally {
    if (connection) {
      connection.release(); // release to pool
    }
  }
});

//for testing
// recipes.get('/favorites', async (req, res) => {
//     try {
//         connection = await pool.getConnection();
//         let sql = 'SELECT * FROM v3_recipe_favorites';
//         await connection.query(sql)
//             .then((results) => {
//                 res.send(JSON.stringify(results)).end();
//                 // res.json(results).end();
//             });
//     } catch (error) {
//         res.sendStatus(500).end();
//         throw error;
//     } finally {
//         if (connection) {
//             connection.release(); // release to pool
//         }
//     }
// });

module.exports = recipes
