const express = require('express');
const recipes = express.Router();
const fetch = require("node-fetch");

const pool = require('../../database.js');
let connection;

const {
  selectRecipes,
  selectRecipeIngredients,
  selectRecipeFavorites,
  insertRecipeFavorite,
  deleteRecipeFavorite,
  importRecipes,
} = require('./functions/recipes.js');

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
              if (data.results.length > 0) {
                const recipeIDs = data.results.map((item) => {
                  return item.id
                });
                importRecipes(connection, recipeIDs);
                selectRecipes(connection, recipeIDs, page, limit)
                  .then((rows) => {
                    if (rows.length > 0) {
                      res.json(rows.filter((recipe, index) => index !== 'meta')).end();
                    } else {
                      res.sendStatus(406).end();
                    }
                  });
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

recipes.get('/', async (req, res) => {
    try {
        connection = await pool.getConnection();
        let sql = 'SELECT * FROM v4_recipes';
        await connection.query(sql)
            .then((results) => {
                res.send(JSON.stringify(results)).end();
                // res.json(results).end();
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
    await connection.query('SELECT fridge_id FROM v3_sessions WHERE session=?', [session])
      .then((rows) => {
        if (rows.length > 0) {
          // @todo handle possible duplicate sessions
          const fridgeID = rows[0].fridge_id;
          selectRecipes(connection, recipeIDs, 1, recipeIDs.length)
            .then((rows2) => {
              if (rows2.length > 0) {
                // console.log(rows2);
                const recipes = rows2.map((recipe, index) => {
                  if (index !== 'meta') {
                    selectRecipeIngredients(connection, recipe.recipeID)
                      .then((rows3) => {
                        if (rows3.length > 0) {
                          recipe.ingredients = rows3.filter((ingredient, index2) => index2 !== 'meta');
                        }
                      });
                    selectRecipeFavorites(connection, recipe.recipeID, fridgeID)
                      .then((rows3) => {
                        if (rows3.length > 0) {
                          recipe.favorites = rows3.filter((favorite, index2) => index2 !== 'meta');
                        }
                      });
                    return recipe;
                  }
                });
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
 * @description Insert favorited recipe for current user.
 * @param {string} session
 * @param {integer} userID
 * @param {integer} recipeID
 * @returns {interger} recipeFavoriteID
 */
recipes.post('/favorite', async (req, res) => {
  // check params data type
  let session, userID, recipeID;
  try {
    if (typeof req.body.session !== 'string') {
      throw new TypeError();
    }
    session = req.body.session;
    userID = parseInt(req.body.userID);
    recipeID = parseInt(req.body.recipeID);
  } catch (error) {
    res.sendStatus(400).end();
    throw error;
  }
  // check params data range
  if (session.length !== 36 || userID <= 0 || recipeID <= 0) {
    res.sendStatus(400).end();
    return;
  }
  // run query to mariadb
  try {
    connection = await pool.getConnection();
    await connection.query('SELECT 1 FROM v4_sessions WHERE session=?', [session])
      .then((rows) => {
        if (rows.length > 0) {
          insertRecipeFavorite(connection, userID, recipeID)
            .then((results) => {
              if (results.affectedRows > 0) {
                res.json({ recipeFavoriteID: results.insertId }).end();
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

/**
 * DELETE /v4/recipes/favorite
 * @description Delete favorited recipe for current user.
 * @param {string} session
 * @param {integer} recipeFavoriteID
 */
recipes.delete('/favorite', async (req, res) => {
  // check params data type
  let session, recipeFavoriteID;
  try {
    if (typeof req.query.session !== 'string') {
      throw new TypeError();
    }
    session = req.query.session;
    recipeFavoriteID = req.query.recipeFavoriteID;
  } catch (error) {
    res.sendStatus(400).end();
    throw error;
  }
  // check params data range
  if (session.length !== 36 || recipeFavoriteID <= 0) {
    res.sendStatus(400).end();
    return;
  }
  // run query to mariadb
  try {
    connection = await pool.getConnection();
    await connection.query('SELECT 1 FROM v4_sessions WHERE session=?', [session])
      .then((rows) => {
        if (rows.length > 0) {
          deleteRecipeFavorite(connection, recipeFavoriteID)
            .then((results) => {
              if (results.affectedRows > 0) {
                res.sendStatus(200).end();
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
    await connection.query('SELECT 1 AS fridgeID FROM v4_sessions WHERE session=?', [session])
      .then(async (rows) => {
        if (rows.length > 0) {
          let sql = 'SELECT recipe_id AS recipeID FROM v4_recipe_favorites WHERE user_id=?';
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
recipes.get('/favorites', async (req, res) => {
    try {
        connection = await pool.getConnection();
        let sql = 'SELECT * FROM v4_recipe_ingredients';
        await connection.query(sql)
            .then((results) => {
                res.send(JSON.stringify(results)).end();
                // res.json(results).end();
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

module.exports = recipes
