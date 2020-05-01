const express = require('express');
const users = express.Router();

const pool = require('../../database.js');
let connection;

users.get('/', async (req, res) => {
  try {
    connection = await pool.getConnection();
    await connection.query('SELECT * FROM v3_users')
      .then((results) => {
        res.send(JSON.stringify(results)).end();
        // res.json(results).end();
      });
  } catch (error) {
    res.sendStatus(401).end();
    throw error;
  } finally {
    if (connection) {
      connection.release(); // release to pool
    }
  }
});

users.post('/:name', async (req, res) => {
  try {
    connection = await pool.getConnection();
    // sql = 'UPDATE v3_users (name) VALUES (?) WHERE fridge_id=' + req.params.fridge_id;
    // sql = 'UPDATE v3_users SET name=' + req.params.name + ' WHERE fridge_id=' + req.params.fridge_id;
    sql = 'INSERT INTO v3_users (name, fridge_id, role, intolerances) VALUES(?, ?, ?, ?)';
    console.log(req.params)
    await connection.query(sql, [req.params.name, req.body.fridge_id, req.body.role, req.body.intolerances])
      .then((results) => {
        res.send(JSON.stringify(results)).end();
        // res.json(results).end();
      });
  } catch (error) {
    res.sendStatus(401).end();
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
