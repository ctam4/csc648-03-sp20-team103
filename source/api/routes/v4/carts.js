const express = require('express');
const carts = express.Router();
const fetch = require('node-fetch');

const pool = require('../../database.js');
let connection;


/**
 * POST /v4/ingredients
 * @description Insert inventory list of current fridges with session.
 * @param {string} session
 * @param {integer} ingredientID
 * @param {string} name
 * @param {string|null} image
 * @returns {integer} ingredientID
 */
carts.post('/ingredient', async (req, res) => {
  // check correct params
  // if (Object.keys(req.body).length !== 5 || !('userID' in req.body && 'ingredientID' in req.body && 'quantity' in req.body && 'unit' in req.body)) {
  //   res.sendStatus(400).end();
  //   return;
  // }
  // check params data type
  let userID, ingredientID, quantity, unit;
  try {
    // if (typeof req.body.session !== 'string' || typeof req.body.name !== 'string' || (typeof req.body.image !== 'string' && req.body.image !== null)) {
    //   throw new TypeError();
    // }
    session = req.body.session;
    userID = parseInt(req.body.userID);
    ingredientID = parseInt(req.body.ingredientID);
    quantity = parseInt(req.body.quantity);
    unit = req.body.unit;
    addedTS = pasreInt(req.body.addedTS);
  } catch (error) {
    res.sendStatus(400).end();
    throw error;
  }
  // check params data range
  // @todo validate image is url
  if (session.length !== 36 || ingredientID <= 0) {
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
          // insert for endpoint
          await connection.query('INSERT IGNORE INTO v4_carts (user_id, ingredient_id, quantity, unit, added_ts) VALUES ( ?, ?, ?, ?, FROM_UNIXTIME(?))', [userID, ingredientID, quantity, unit, addedTS])
            .then(async (results) => {
              console.log('here', results);
              if (results.affectedRows > 0) {
                const results = await connection.query('SELECT cart_id, added_ts FROM v4_carts WHERE user_id=? ORDER BY added_ts  LIMIT 1', [userID])
                res.json({
                  ...results[0],
                }).end();
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
carts.get('/', async (req, res) => {
  try {
    connection = await pool.getConnection();
    let sql = 'SELECT * FROM v4_carts';
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

//for testing
carts.delete('/', async (req, res) => {
  try {
    connection = await pool.getConnection();
    let sql = 'DELETE FROM v4_carts';
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

module.exports = carts;
