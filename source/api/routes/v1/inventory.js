const express = require('express');
const inventory = express.Router();

const pool = require('../../database.js');
let connection;

//inventory

inventory.get('/', async (req, res) => {
  if (Object.keys(req.query).length == 0) { // TODO: need to check contains either begin & limit
    res.sendStatus(400).end();
  }
  try {
    connection = await pool.getConnection();
    await connection.query('select * from inventory where inventory_id>=? LIMIT ?', [req.query.begin], [req.query.limit], function (error, results, fields) {
      res.json(results.inventory_id);
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

inventory.post('/', async (req, res) => {
  try {
    connection = await pool.getConnection();
    await connection.query('INSERT INTO inventory SET ?', req.body, function (error, results, fields) {
      if (error) throw error;
      res.json(results);
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

//console.log('inventory.stack');
//console.log(inventory.stack);

module.exports = inventory;
