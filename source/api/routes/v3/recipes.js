const express = require('express');
const recipes = express.Router();
const fetch = require("node-fetch");


const pool = require('../../database.js');
let connection;

/**
 * GET /v3/recipes/search
 * @description Retrieve recipes list of current fridges with session.
 * @param {string} session
 * @param {string} query
 * @param {integer} page (optional)
 * @param {integer} limit (optional)
 * @returns {object[]} recipes
 */

let recipeIDS = [];
let recipeInfo = [];

//function to get recipe info of each recipeID
async function handleRecipes() {
   recipeInfo = [];
   for (let i = 0; i < recipeIDS.length; i++) {
      let results = [];
      await fetch('https://api.spoonacular.com/recipes/' + recipeIDS[i] + '/information?includeNutrition=false' + '&apiKey=1732084d103b437e9bc0a778d540c589', {
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
            let recipe_id = data.id;
            // let name = data.sourceName;
            let title = data.title;
            let image = data.image;
            let servings = data.servings;
            let cooking_time = data.readyInMinutes;
            let instructions = "none";
            if (data.instructions !== null) {
               instructions = data.instructions;
            }

            connection.query('INSERT INTO v3_recipes(recipe_id,  title, image, servings, cooking_time, instructions) VALUES(?, ?, ?, ?, ?, ?)', [recipe_id, title, image, servings, cooking_time, instructions]);
            // console.log(data);
            let ingredientInfo = [];
            //getting the ingredients
            if (data) {
               data.extendedIngredients.map((item) => {
                  ingredientInfo.push(item.original);
               });
               // parse date format
               //store recipe info
               results = {
                  recipe_id: recipe_id,
                  title: title,
                  image: image,
                  servings: servings,
                  cooking_time: cooking_time,
                  instructions: instructions,
                  ingredients: ingredientInfo
               }
            } else {
               res.sendStatus(406).end();
            }
         });
      recipeInfo.push(results);
   }
   return recipeInfo

}
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
      session = req.query.session;
      query = req.query.query;
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
      // retrieve fridge_id
      await connection.query('SELECT fridge_id FROM v3_sessions WHERE session=?', [session])
         .then(async (rows) => {
            if (rows.length > 0) {
               // @todo handle possible duplicate sessions
               const fridgeID = rows[0].fridge_id;
               // retrieve for endpoint
               await fetch('https://api.spoonacular.com/recipes/search?query=' + query + '&number=' + limit + '&apiKey=1732084d103b437e9bc0a778d540c589', {
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
                     console.log(data.results.length);
                     if (data.results.length > 0) {

                        data.results.map((item) => {
                           recipeIDS.push(item.id);

                        });
                        console.log(recipeIDS);
                        // res.json(results).end();
                     } else {
                        res.sendStatus(406).end();
                     }
                  });

               //call function to get recipe info for all recipeIDS
               recipeInfo = await handleRecipes();
               res.json(recipeInfo).end();

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

//for testing
recipes.get('/', async (req, res) => {
   try {
      connection = await pool.getConnection();
      let sql = 'SELECT * FROM v3_recipes';
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
recipes.post('/', async (req, res) => {
  try {
    connection = await pool.getConnection();
    await connection.query('INSERT IGNORE INTO fridges VALUES (?)', req.body.fridge_id)
      .then((results) => {
        res.json(results).end();
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
 * POST /v3/recipes/favorite
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
      await connection.query('SELECT fridge_id FROM v3_sessions WHERE session=?', [session])
         .then(async (rows) => {
            if (rows.length > 0) {
               await connection.query('INSERT INTO v3_recipe_favorites (user_id, recipe_id) VALUES (?, ?)', [user_id, recipe_id])
               .then((results) => {
                  res.send({ ...results, user_id: user_id, recipe_id: recipe_id }).end();
                  // res.json(results).end();
               });
            }
            else {
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
 * POST /v3/recipes/favorite
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
      await connection.query('SELECT fridge_id FROM v3_sessions WHERE session=?', [session])
         .then(async (rows) => {
            if (rows.length > 0) {
               await connection.query('DELETE FROM v3_recipe_favorites WHERE user_id=?', [user_id])
                  .then((results) => {
                     res.send({ ...results, user_id: user_id, recipe_id: recipe_id }).end();
                     // res.json(results).end();
                  });
            }
            else {
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
      let sql = 'SELECT * FROM v3_recipe_favorites';
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
