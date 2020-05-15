const express = require('express');
const carts = express.Router();
const fetch = require('node-fetch');

const pool = require('../../database.js');
let connection;

/**
 * POST /v4/carts/ingredient
 * @description Insert ingredient to carts list of current fridges with session.
 * @param {string} session
 * @param {integer} userID
 * @param {integer} ingredientID
 * @param {float} quantity
 * @param {string|null} unit
 * @returns {integer} cartID
 */
carts.post('/ingredient', async (req, res) => {
  // check correct params
  if (Object.keys(req.body).length == 5 && !('session' in req.body && 'userID' in req.body && 'ingredientID' in req.body && 'quantity' in req.body && 'unit' in req.body)) {
    res.sendStatus(400).end();
    return;
  }
  let userID, ingredientID, quantity, unit;
  try {
    if (typeof req.body.session !== 'string' || typeof req.body.unit !== 'string') {
      throw new TypeError();
    }
    session = req.body.session;
    userID = parseInt(req.body.userID);
    ingredientID = parseInt(req.body.ingredientID);
    quantity = parseFloat(req.body.quantity);
    unit = req.body.unit;
  } catch (error) {
    res.sendStatus(400).end();
    throw error;
  }
  // check params data range
  if (session.length !== 36 || userID <= 0 || ingredientID <= 0 || quantity <= 0.0 || unit.length === 0) {
    res.sendStatus(400).end();
    return;
  }
  // run query to mariadb
  try {
    connection = await pool.getConnection();
    // retrieve fridge_id
    await connection.query('SELECT fridge_id FROM v4_sessions WHERE session=?', [session])
      .then(async (rows) => {
        if (rows.length > 0) {
          // @todo handle possible duplicate sessions
          const fridgeID = rows[0].fridge_id;
          // insert for endpoint
          await connection.query('INSERT IGNORE INTO v4_carts (fridge_id, user_id, ingredient_id, quantity, unit) VALUES (?, ?, ?, ?, ?)', [fridgeID, userID, ingredientID, quantity, unit])
            .then((results) => {
              if (results.affectedRows > 0) {
                res.json({ cartID: results.insertId }).end();
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
 * POST /v4/ingredients
 * @description Insert inventory list of current fridges with session.
 * @param {string} session
 * @param {integer} ingredientID
 * @param {string} name
 * @param {string|null} image
 * @returns {integer} ingredientID
 */


carts.post('/recipe', async (req, res) => {

  let userID, ingredientID, quantity, unit;
  try {
    // if (typeof req.body.session !== 'string' || typeof req.body.name !== 'string' || (typeof req.body.image !== 'string' && req.body.image !== null)) {
    //   throw new TypeError();
    // }
    session = req.body.session;
    userID = parseInt(req.body.userID);
    recipeID = parseInt(req.body.recipeID);
    // addedTS = pasreInt(req.body.addedTS);
  } catch (error) {
    res.sendStatus(400).end();
    throw error;
  }
  // check params data range
  // @todo validate image is url
  if (session.length !== 36 || recipeID <= 0) {
    res.sendStatus(400).end();
    return;
  }
  // run query to mariadb
  try {
    connection = await pool.getConnection();
    // retrieve fridge_id
    let results = [];
    let fridgeID = 1;
    await connection.query('SELECT fridge_id FROM v4_sessions WHERE session=?', [session])
      .then(async (rows) => {
        if (rows.length > 0) {
          fridgeID = rows[0].fridge_id;
          // insert for endpoint
          // await connection.query('INSERT IGNORE INTO v4_carts (user_id, ingredient_id, quantity, unit, added_ts) VALUES ( ?, ?, ?, ?, FROM_UNIXTIME(?))', [userID, ingredientID, quantity, unit, addedTS])
          await connection.query('SELECT ingredient_id as ingredientID, quantity, unit FROM v4_recipe_ingredients WHERE recipe_id=? LIMIT 1', [recipeID])
            .then(async (data) => {
              console.log('here', 'datalegth', data.length);
              if (data.length > 0) {                
                data.map((item)=>{
                  results.push({
                    ingredientID: item.ingredientID,
                    quantity: item.quantity,
                    unit: item.unit,
                  });
                })
              } else {
                res.sendStatus(406).end();
              }
            });
        } else {
          res.sendStatus(401).end();
        }
      });
    // console.log(results[0].ingredientID, "result")
    await connection.query('INSERT INTO v4_carts (fridge_id, user_id, ingredient_id, quantity, unit) VALUES(?, ?, ?, ?,?)', [fridgeID, userID, results[0].ingredientID, results[0].quantity, results[0].unit])
      .then(async()=>{
        await connection.query('SELECT ingredient_id as ingredientID, quantity, unit, added_ts AS addedTS FROM v4_carts ORDER BY cart_id DESC  LIMIT 1', [recipeID])
          .then((results2)=>{
            res.send({
              ingredientID: results2[0].ingredientID,
              quantity: results2[0].quantity,
              unit: results2[0].unit,
              addedTS: results2[0].addedTS
            }).end();
          });
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
// carts.get('/', async (req, res) => {
//   try {
//     connection = await pool.getConnection();
//     let sql = 'SELECT * FROM v4_carts';
//     await connection.query(sql)
//       .then((results) => {
//         res.send(JSON.stringify(results)).end();
//         // res.json(results).end();
//       });
//   } catch (error) {
//     res.sendStatus(500).end();
//     throw error;
//   } finally {
//     if (connection) {
//       connection.release(); // release to pool
//     }
//   }
// });

/**
 * DELETE /v4/carts
 * @description Delete cart for current fridges with session.
 * @param {string} session
 * @param {integer(,integer)} cartIDs
 */
carts.delete('/', async (req, res) => {
  // check correct params
  if (Object.keys(req.query).length !== 2 || !('session' in req.query && 'cartIDs' in req.query)) {
    res.sendStatus(400).end();
    return;
  }
  // check params data type
  let session, cartIDs;
  try {
    if (typeof req.query.session !== 'string') {
      throw new TypeError();
    }
    session = req.query.session;
    cartIDs = req.query.cartIDs.split(',').map(value => parseInt(value));
  } catch (error) {
    res.sendStatus(400).end();
    throw error;
  }
  // check params data range
  if (session.length !== 36 || !cartIDs.every(value => !isNaN(value) && value > 0)) {
    res.sendStatus(400).end();
    return;
  }
  // run query to mariadb
  try {
    connection = await pool.getConnection();
    // retrieve fridge_id
    await connection.query('SELECT fridge_id FROM v4_sessions WHERE session=?', [session])
      .then(async (rows) => {
        if (rows.length > 0) {
          // @todo handle possible duplicate sessions
          const fridgeID = rows[0].fridge_id;
          await connection.query('DELETE FROM v4_carts WHERE fridge_id=? AND cart_id IN (?)', [fridgeID, cartIDs.join(',')])
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
// carts.delete('/', async (req, res) => {
//   try {
//     connection = await pool.getConnection();
//     let sql = 'DELETE FROM v4_carts';
//     await connection.query(sql)
//       .then((results) => {
//         res.send(JSON.stringify(results)).end();
//         // res.json(results).end();
//       });
//   } catch (error) {
//     res.sendStatus(500).end();
//     throw error;
//   } finally {
//     if (connection) {
//       connection.release(); // release to pool
//     }
//   }
// });

module.exports = carts;
