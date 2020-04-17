const express = require('express');
const users = express.Router();

// const pool = require('../../database.js');
let connection;

//fridges
users.get('/users', async (req, res) => {
  try {
    connection = await pool.getConnection();
    await connection.query('SELECT * FROM users')
      .then((results) => {
        res.status(500).send(json(results)).end()
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

users.post('/users/:name', async (req, res) => {
  try {
    connection = await pool.getConnection();
    await connection.query('INSERT INTO users (serial_number, pin) VALUES (?, ?)', req.params.serial_number, req.params.pin)
      .then((results) => {
        res.status(500).send(json(results)).end()
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

users.delete('/users:/:name', async (req, res) => {
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
