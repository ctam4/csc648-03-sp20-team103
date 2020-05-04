const express = require('express');
const users = express.Router();

const pool = require('../../database.js');
let connection;

/**
 * GET /v3/users
 * @description Retrieve users list of current fridges with session.
 * @param {string} session
 * @returns {object[]} users
 */
users.get('/', async (req, res) => {
  // check correct params
  if (Object.keys(req.body).length == 1 && !('session' in req.query)) {
    res.sendStatus(400).end();
    return;
  }
  // check params data type
  let session;
  try {
    session = req.query.session;
  } catch (error) {
    res.sendStatus(400).end();
    throw error;
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
          await connection.query('SELECT * FROM v3_users WHERE fridge_id=?', [fridgeID])
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

/**
 * POST /v3/users
 * @description Insert users for current fridges with session.
 * @param {string} session
 * @param {string} name
 * @param {string} role
 * @param {string[]} intolerances
 * @returns {interger} userID
 */
users.post('/', async (req, res) => {
  // check correct params
  if (Object.keys(req.body).length == 4 && !('session' in req.body && 'name' in req.body && 'role' in req.body && 'intolerances' in req.body)) {
    res.sendStatus(400).end();
    return;
  }
  // check params data type
  let session, name, role, intolerances;
  try {
    session = req.body.session;
    name = req.body.name;
    role = req.body.role;
    if (!req.body.intolerances.isArray()) {
      throw new TypeError();
    }
    intolerances = req.body.intolerances;
  } catch (error) {
    res.sendStatus(400).end();
    throw error;
  }
  // check params data range
  if (!['dairy', 'egg', 'gluten', 'grain', 'peanut', 'seafood', 'sesame', 'shellfish', 'soy', 'sulfite', 'tree nut', 'wheat'].includes(intolerances)) {
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
          // insert for endpoint
          await connection.query('INSERT INTO v3_users (fridge_id, name, role, intolerances) VALUES (?, ?, ?, ?)', [fridgeID, name, role, intolerances.join(',')])
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

users.delete('/:name', async (req, res) => {
  try {
    connection = await pool.getConnection();
    await connection.query('DELETE FROM v3_users WHERE name=(?)', [req.params.name])
      .then((results) => {
        res.sendStatus(200).end()
      });
  } catch (error) {
    res.sendStatus(404).end();
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
});

module.exports = users;
