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
    // addedTS = pasreInt(req.body.addedTS);
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
          // await connection.query('INSERT IGNORE INTO v4_carts (user_id, ingredient_id, quantity, unit, added_ts) VALUES ( ?, ?, ?, ?, FROM_UNIXTIME(?))', [userID, ingredientID, quantity, unit, addedTS])
          await connection.query('INSERT IGNORE INTO v4_carts (user_id, ingredient_id, quantity, unit) VALUES ( ?, ?, ?, ?)', [userID, ingredientID, quantity, unit])
            .then(async (results) => {
              console.log('here', results);
              if (results.affectedRows > 0) {
                const results = await connection.query('SELECT cart_id, added_ts FROM v4_carts WHERE user_id=? ORDER BY cart_id  LIMIT 1', [userID])
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

/**
 * GET /v4/carts
 * @description Retrieve inventory list of current fridges with session.
 * @param {string} session
 * @param {integer} page (optional)
 * @param {integer} limit (optional)
 * @param {string} sort (optional)
 * @param {boolean} descending (optional)
 * @returns {object[]} inventory
 */
carts.get('/', async (req, res) => {
  // check correct params
  if ((Object.keys(req.query).length == 1 ||
      (Object.keys(req.query).length == 3 && !('page' in req.query && 'limit' in req.query)) ||
      (Object.keys(req.query).length == 5 && !('page' in req.query && 'limit' in req.query && 'sort' in req.query && 'descending' in req.query))) &&
    !('session' in req.query)) {
    res.sendStatus(400).end();
    return;
  }
  // check params data type
  let session, page, limit, sort, descending;
  try {
    if (typeof req.query.session !== 'string' || (req.query.sort && typeof req.query.sort !== 'string')) {
      throw new TypeError();
    }
    session = req.query.session;
    userID = parseInt(req.query.userID);
    page = (req.query.page && parseInt(req.query.page)) || 1;
    limit = (req.query.limit && parseInt(req.query.limit)) || 100;
    sort = req.query.sort || null;
    descending = req.query.descending || null;
  } catch (error) {
    res.sendStatus(400).end();
    throw error;
  }
  // check params data range
  if (session.length !== 36 || page <= 0 || limit <= 0 ) {

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
          // retrieve for endpoint
          let sql = 'SELECT cart_id AS cartID, user_id AS userID, ingredient_id AS ingredientID, quantity, unit, added_ts AS addedTS FROM v4_carts';
          switch (sort) {
            case 'userID':
              sql += ' ORDER BY ' + sort;
              if (!descending) {
                sql += ' ASC';
              } else {
                sql += ' DESC';
              }
              break;

            case 'ingredientID':
              sql += ' ORDER BY ' + sort;
              if (!descending) {
                sql += ' ASC';
              } else {
                sql += ' DESC';
              }
              break;

            case 'addedTS':
              sql += ' ORDER BY ' + sort;
              if (!descending) {
                sql += ' ASC';
              } else {
                sql += ' DESC';
              }
              break;
            default: break;
          }
          await connection.query(sql + ' LIMIT ? OFFSET ?', [limit, (page - 1) * limit])
            .then((rows) => {
              if (rows.length > 0) {
                console.log(sql, descending);
                // res.send(JSON.stringify(rows)).end();
                res.json(rows.filter((inventory, index) => index !== 'meta')).end();
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
 * POST /v4/logout
 * @description Delete session to logout.
 * @param {string} session
 * @param {[int]] cartID
 */
carts.delete('/', async (req, res) => {
  // check correct params
  let session, userIDs;
  try {
    if (typeof req.query.session !== 'string' || typeof req.query.userIDs !== 'string') {
      throw new TypeError();
    }
    session = req.query.session;
    userIDs = req.query.userIDs.split(',').map(value => parseInt(value));
  } catch (error) {
    res.sendStatus(400).end();
    throw error;
  }

  if (session.length !== 36) {
    res.sendStatus(400).end();
    return;
  }
  // run query to mariadb
  try {
    connection = await pool.getConnection();
    await connection.query('SELECT 1 FROM v4_sessions WHERE session=?', [session])
      .then(async (rows) => {
        if (rows.length > 0) {
          console.log(userIDs.join(', '));
          newIDs = userIDs.join(',')
          console.log(newIDs)
          sql = 'DELETE  FROM v4_carts WHERE user_id IN (' + newIDs + ')';
          await connection.query(sql)
            .then(async (rows2) => {
              console.log(rows2.affectedRows);
              if (rows2.affectedRows > 0) {
                res.send(rows2).end();
              } 
              else{
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
