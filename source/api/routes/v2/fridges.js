const express = require('express');
const fridges = express.Router();

const pool = require('../../database.js');
let connection;

//fridges

// fridges.get('/', async (req, res) => {
//   if (Object.keys(req.query).length > 0) { // TODO: need to check contains either begin & limit
//     res.sendStatus(400).end();
//   }
//   try {
//     connection = await pool.getConnection();
//     await connection.query('SELECT fridge_id FROM fridges')
//       .then((results) => {
//         res.json(results).end();
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

// for testing
fridges.get('/', async (req, res) => {
  try {
    connection = await pool.getConnection();
    const results = await connection.query('SELECT * FROM v2_fridges');
    res.send(JSON.stringify(results)).end()
  } catch (error) {
    res.sendStatus(401).end()
  }
  finally {
    if (connection) {
      connection.release();
    }
  }

});

fridges.post('/', async (req, res) => {
  try {
    connection = await pool.getConnection();
    const results = await connection.query('INSERT INTO v2_fridges (serial_number, pin) VALUES (?, ?  )', [req.body.serial_number, req.body.pin]);
    res.send(JSON.stringify(results)).end()
  } catch (error) {
    res.sendStatus(401).end()
  }
  finally {
    if(connection) {
      connection.release();
    }
  }
  
});

//console.log('fridges.stack');
//console.log(fridges.stack);

module.exports = fridges;
