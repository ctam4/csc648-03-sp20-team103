const express = require('express');
const { v4: uuidv4 } = require('uuid');
const pool = require('../../database.js');

const login = express.Router();
let connection;

/**
 * POST /v4/login
 * @description Create session after finding corresponding fridgeID using serialNumber and PIN.
 * @param {string} serialNumber
 * @param {string} pin
 * @return {string} session
 */
login.post('/', async (req, res) => {
  // check correct params
  if (Object.keys(req.body).length !== 2 || !('serialNumber' in req.body && 'pin' in req.body)) {
    res.sendStatus(400).end();
    return;
  }
  // check params data type
  const {
    serialNumber,
    pin,
  } = req.body;
  if (typeof serialNumber !== 'string' || typeof pin !== 'string') {
    res.sendStatus(400).end();
    throw new TypeError();
  }
  if (serialNumber.length === 0 || serialNumber.length > 16 || pin.length === 0
    || pin.length > 16) {
    res.sendStatus(400).end();
    return;
  }
  // run query to mariadb
  try {
    connection = await pool.getConnection();
    connection.query('SELECT fridge_id FROM v4_fridges WHERE serial_number=? AND pin=?', [serialNumber, pin])
      .then(async (rows) => {
        if (rows.length > 0) {
          // @todo handle possible duplicate sessions
          const fridgeID = rows[0].fridge_id;
          const session = uuidv4();
          const results = (await connection.query('SELECT CURRENT_TIMESTAMP AS loggedInTS, DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 1 MONTH) as expiresTS'))[0];
          connection.query('INSERT IGNORE INTO v4_sessions (session, fridge_id, logged_in_ts, expires_ts) VALUES (?, ?, ?, ?)', [session, fridgeID, results.loggedInTS, results.expiresTS])
            .then((results2) => {
              if (results2.affectedRows > 0) {
                res.json({ ...results, session }).end();
              } else {
                res.sendStatus(406).end();
              }
            });
        } else {
          res.sendStatus(406).end();
        }
      });
  } catch (error) {
    res.sendStatus(500).end();
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
});

module.exports = login;
