const express = require('express');
const pool = require('../../database.js');

const users = express.Router();
let connection;

const { selectUsers, insertUser, deleteUser } = require('./functions/users.js');

/**
 * GET /v4/users
 * @description Retrieve users list of current fridges with session.
 * @param {string} session
 * @returns {object[]} users
 */
users.get('/', async (req, res) => {
  // check correct params
  if (Object.keys(req.query).length !== 1 || !('session' in req.query)) {
    res.sendStatus(400).end();
    return;
  }
  // check params data type
  const { session } = req.query;
  if (typeof session !== 'string') {
    res.sendStatus(400).end();
    throw new TypeError();
  }
  // check params data range
  if (session.length !== 36) {
    res.sendStatus(400).end();
    return;
  }
  // run query to mariadb
  try {
    connection = await pool.getConnection();
    // retrieve fridge_id
    connection.query('SELECT fridge_id FROM v4_sessions WHERE session=?', [session])
      .then((rows) => {
        if (rows.length > 0) {
          // @todo handle possible duplicate sessions
          const fridgeID = rows[0].fridge_id;
          // retrieve for endpoint
          selectUsers(connection, fridgeID)
            .then((rows2) => {
              if (rows2.length > 0) {
                res.json(rows2.filter((_, index) => index !== 'meta')).end();
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
 * POST /v4/users
 * @description Insert users for current fridges with session.
 * @param {string} session
 * @param {string} name
 * @param {string} role
 * @param {string[]} intolerances
 * @returns {interger} userID
 */
users.post('/', async (req, res) => {
  // check correct params
  if (Object.keys(req.body).length !== 4 || !('session' in req.body && 'name' in req.body && 'role' in req.body && 'intolerances' in req.body)) {
    res.sendStatus(400).end();
    return;
  }
  // check params data type
  const {
    session,
    name,
    role,
    intolerances,
  } = req.body;
  if (typeof session !== 'string' || typeof name !== 'string' || typeof role !== 'string' || !Array.isArray(intolerances)) {
    res.sendStatus(400).end();
    throw new TypeError();
  }
  // check params data range
  const knownIntolerances = ['dairy', 'egg', 'gluten', 'grain', 'peanut', 'seafood', 'sesame', 'shellfish', 'soy', 'sulfite', 'tree nut', 'wheat'];
  if (session.length !== 36 || name.length < 3 || name.length > 64 || role.length === 0
    || role.length > 64
    || !intolerances.every((intolerance) => knownIntolerances.includes(intolerance))) {
    res.sendStatus(400).end();
    return;
  }
  // run query to mariadb
  try {
    connection = await pool.getConnection();
    // retrieve fridge_id
    connection.query('SELECT fridge_id FROM v4_sessions WHERE session=?', [session])
      .then((rows) => {
        if (rows.length > 0) {
          // @todo handle possible duplicate sessions
          // @todo handle duplicate names
          const fridgeID = rows[0].fridge_id;
          // insert for endpoint
          insertUser(connection, fridgeID, name, role, intolerances)
            .then((results) => {
              if (results.affectedRows > 0) {
                res.json({ userID: results.insertId }).end();
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
 * DELETE /v4/users/:userID
 * @description Delete user for current fridges with session.
 * @param {string} session
 */
users.delete('/:userID', async (req, res) => {
  // check correct params
  if (Object.keys(req.query).length !== 1 || !('session' in req.query)) {
    res.sendStatus(400).end();
    return;
  }
  // check params data type
  let userID;
  let session;
  try {
    if (typeof req.query.session !== 'string') {
      throw new TypeError();
    }
    session = req.query.session;
    userID = parseInt(req.params.userID, 10);
  } catch (error) {
    res.sendStatus(400).end();
    throw error;
  }
  // check params data range
  if (userID <= 0 || session.length !== 36) {
    res.sendStatus(400).end();
    return;
  }
  // run query to mariadb
  try {
    connection = await pool.getConnection();
    // retrieve fridge_id
    connection.query('SELECT fridge_id FROM v4_sessions WHERE session=?', [session])
      .then((rows) => {
        if (rows.length > 0) {
          // @todo handle possible duplicate sessions
          const fridgeID = rows[0].fridge_id;
          // insert for endpoint
          deleteUser(connection, userID, fridgeID)
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

module.exports = users;
