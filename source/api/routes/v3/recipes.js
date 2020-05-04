const express = require('express');
const recipes = express.Router();

const pool = require('../../database.js');
let connection;

recipes.get('/:limit&descending', async (req, res) => {
  if (Object.keys(req.query).length > 0) { // TODO: need to check contains either begin & limit
    res.sendStatus(400).end();
  }
  try {
    connection = await pool.getConnection();
    if (req.query.descending === true) {
      await connection.query('SELECT * FROM v3_recipes ORDER BY name LIMIT (?)')
        .then((results) => {
          res.json(results).end();
        });
    }
    else {
      await connection.query('SELECT * FROM v3_recipes LIMIT (?)')
        .then((results) => {
          res.json(results).end();
        });
    }
  } catch (error) {
    res.sendStatus(500).end();
    throw error;
  } finally {
    if (connection) {
      connection.release(); // release to pool
    }
  }
});

recipes.post('/', async (req, res) => {
  try {
    connection = await pool.getConnection();
    await connection.query('INSERT INTO fridges VALUES (?)', req.body.fridge_id)
      .then((results) => {
        res.json(results).end();
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

module.exports = recipes;
