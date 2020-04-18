const express = require('express');
const users = express.Router();

const pool = require('../../database.js');
let connection;

//fridges
users.get('/', async (req, res) => {
  try {
    connection = await pool.getConnection();
    await connection.query('SELECT * FROM v2_users')
      .then((results) => {
        res.send(JSON.stringify(results)).end()
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

users.post('/:name/:fridge_id', async (req, res) => {
  try {
    connection = await pool.getConnection();
    sql = 'INSERT INTO v2_users (name) VALUES (?) WHERE fridge_id=' + req.params.fridge_id
    await connection.query(sql, [req.params.name])
      .then((results) => {
        res.send(JSON.stringify(results)).end()
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

users.delete('/:name', async (req, res) => {
  try {
    connection = await pool.getConnection();
    await connection.query('DELETE FROM users WHERE name=(?)', req.params.name)
      .then((results) => {
        res.sendStatus(200).end()
      });
  } catch(error) {
    res.sendStatus(404).end();
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
});

//console.log('fridges.stack');
//console.log(fridges.stack);

module.exports = users;
