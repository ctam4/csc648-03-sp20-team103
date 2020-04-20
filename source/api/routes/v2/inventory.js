const express = require('express');
const inventory = express.Router();

const pool = require('../../database.js');
let connection;

inventory.get('/list/:state', async (req, res) => {
  try {
    connection = await pool.getConnection();
    let state = req.params.state
    let limit = req.query.limit
    let sql = 'SELECT * FROM v2_inventory WHERE state=? LIMIT ' + limit
    await connection.query(sql, [state])
      .then((results) => {
        res.send(JSON.stringify(results)).end()
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

//for testing
inventory.get('/', async (req, res) => {
  try {
    connection = await pool.getConnection();
    let sql = 'SELECT * FROM v2_inventory';
    await connection.query(sql)
      .then((results) => {
        res.send(JSON.stringify(results)).end()
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

// ('INSERT INTO v2_inventory (fridge_id, ingredient_id, quantity, unit, expiration_date, price, state) VALUES(?,?,  ?, ?, ?, ?, ?)', [req.body.fridge_id, req.body.ingredient_id, req.body.quantity, req.body.unit, req.body.expiration_date, req.body.price, req.body.state])

//stuck sending request
inventory.post('/manual', async (req, res) => {
  try {
    connection = await pool.getConnection();
    let sql = 'INSERT INTO v2_inventory (fridge_id, ingredient_id, quantity, unit, expiration_date, price, state) VALUES(?,?,  ?, ?, ?, ?, ?)'
    await connection.query(sql, [req.body.fridge_id, req.body.ingredient_id, req.body.quantity, req.body.unit, req.body.expiration_date, req.body.price, req.body.state])
      .then((results) => {
        res.send(JSON.stringify(results)).end()
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

//console.log('inventory.stack');
//console.log(inventory.stack);

module.exports = inventory;
