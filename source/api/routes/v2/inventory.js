const express = require('express');
const inventory = express.Router();

const pool = require('../../database.js');
let connection;

//inventory
// inventory.get('/list/:state', async (req, res) => {
//   try {
//     connection = await pool.getConnection();
//     sql = 'SELECT * FROM v2_inventory WHERE state = ' + [req.params.state] + ' LIMIT ' + [req.body.limit]
//     await connection.query(sql)
//       .then((results) => {
//         res.send(JSON.stringify(results)).end()
//         // res.json(results).end();
//       });
//   } catch (error) {
//     res.sendStatus(500).end();
//     throw error;
//   } finally {
//     if (connection) {
//       connection.release(); // release to pool
//     }
//   }
// });

inventory.post('/manual', async (req, res) => {
  try {
    connection = await pool.getConnection();
    await connection.query('INSERT INTO v2_inventory VALUES(?, ?, ?, ?)', [req.body.ingredient_id, req.body.quantity, req.body.unit, req.body.expiration_date], function (error, results, fields) {
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
