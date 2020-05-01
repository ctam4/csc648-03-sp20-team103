const express = require('express');
const ingredients = express.Router();

const pool = require('../../database.js');
let connection;

ingredients.get('/', async (req, res) => {
  try {
    connection = await pool.getConnection();
    await connection.query('SELECT * FROM v3_ingredients')
      .then((results) => {
        // res.send(JSON.stringify(results)).end()
        res.json(results).end();
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

ingredients.post('/', async (req, res) => {
  try {
    connection = await pool.getConnection();
    await connection.query('INSERT INTO v3_ingredients (ingredient_id, name, image) VALUES(?, ?, ?)', [req.body.ingredient_id, req.body.name, req.body.image])
      .then((results) => {
        // res.send(JSON.stringify(results)).end()
        res.json(results).end();
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

module.exports = ingredients;
