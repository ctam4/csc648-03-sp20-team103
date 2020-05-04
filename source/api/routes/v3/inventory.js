const express = require('express');
const inventory = express.Router();

const pool = require('../../database.js');
let connection;

/**
 * GET /v3/inventory/list:state
 * @description Retrieve inventory list of current fridges with session.
 * @param {string} session
 * @param {integer} page (optional)
 * @param {integer} limit (optional)
 * @param {string} sort (optional)
 * @param {boolean} descending (optional)
 * @returns {object[]} inventory
 */
inventory.get('/list/:state', async (req, res) => {
  // check correct ':state'
  const state = req.params.state;
  if (!['all', 'consumed', 'stored', 'discarded', 'expired'].includes(state)) {
    res.sendStatus(400).end();
    return;
  }
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
    session = req.query.session;
    page = (req.query.page && parseInt(req.query.page)) || 1;
    limit = (req.query.limit && parseInt(req.query.limit)) || 100;
    sort = req.query.sort || null;
    descending = (req.query.descending && (req.query.descending == true || (req.query.descending == false && false))) || null;
  } catch (error) {
    res.sendStatus(400).end();
    throw error;
  }
  // check params data range
  if (page <= 0 || limit <= 0 || (sort != null && !['expiration_date'].includes(sort))) {
    res.sendStatus(400).end();
    return;
  }
  // run query to mariadb
  try {
    connection = await pool.getConnection();
    // retrieve fridge_id
    connection.query('SELECT fridge_id FROM v3_sessions WHERE session=?', [session])
      .then(async (rows) => {
        if (rows.length > 0) {
          // @todo handle possible duplicate sessions
          const fridgeID = rows[0].fridge_id;
          // retrieve for endpoint
          let sql = 'SELECT * FROM v3_inventory WHERE fridge_id=?';
          switch (state) {
            case 'stored':
            case 'consumed':
            case 'discarded':
              sql += ' AND state=\'' + state + '\'';
              break;
            case 'expired':
              sql += ' AND expiration_date IS NOT NULL AND expiration_date < CURRENT_TIMESTAMP';
              break;
          }
          switch (sort) {
            case 'expiration_date':
              sql += ' ORDER BY ' + sort;
              if (descending) {
                sql += ' ASC';
              } else {
                sql += ' DESC';
              }
              break;
          }
          await connection.query(sql + ' LIMIT ?, ?', [fridgeID, limit, (page - 1) * limit])
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
inventory.get('/', async (req, res) => {
  try {
    connection = await pool.getConnection();
    // let sql = 'SELECT * FROM v3_inventory'
    let sql = 'SELECT * FROM v3_inventory WHERE inventory_id=?';
    await connection.query(sql, req.query.inventory_id)
      .then((results) => {
        res.send(JSON.stringify(results)).end();
        // res.json(results).end();
      });
  } catch (error) {
    res.sendStatus(400).end();
    throw error;
  } finally {
    if (connection) {
      connection.release(); // release to pool
    }
  }
});

// ('INSERT INTO v3_inventory (fridge_id, ingredient_id, quantity, unit, expiration_date, price, state) VALUES(?,?,  ?, ?, ?, ?, ?)', [req.body.fridge_id, req.body.ingredient_id, req.body.quantity, req.body.unit, req.body.expiration_date, req.body.price, req.body.state])
//stuck sending request
inventory.post('/manual', async (req, res) => {
  try {
    connection = await pool.getConnection();
    body = Object.keys(req.body)
    if (req.body.state !== undefined) {
      let sql = 'INSERT INTO v3_inventory (fridge_id, ingredient_id, quantity, unit, expiration_date, price, state) VALUES(?,?,  ?, ?, ?, ?, ?)'
      await connection.query(sql, [req.body.fridge_id, req.body.ingredient_id, req.body.quantity, req.body.unit, req.body.expiration_date, req.body.price, req.body.state])
        .then((results) => {
          res.send(JSON.stringify(results)).end();
          // res.json(results).end();
        });
    }
    else if (req.body.state === undefined) {
      let sql = 'INSERT INTO v3_inventory (fridge_id, ingredient_id, quantity, unit, expiration_date, price) VALUES(?,?,  ?, ?, ?, ?)'
      await connection.query(sql, [req.body.fridge_id, req.body.ingredient_id, req.body.quantity, req.body.unit, req.body.expiration_date, req.body.price])
        .then((results) => {
          res.send(JSON.stringify(results)).end();
          // res.json(results).end();
        });
    }
  } catch (error) {
    res.sendStatus(400).end();
    throw error;
  } finally {
    if (connection) {
      connection.release(); // release to pool
    }
  }
});

module.exports = inventory;
