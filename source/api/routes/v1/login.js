const express = require('express');
const login = express.Router();

const pool = require('../../database.js');
let connection;

// login.post('/', async (req, res) => {
//     try {
//         connection = await pool.getConnection();
//         const results = await connection.query('INSERT INTO v2_sessions (serial_number, pin) VALUES (?, ?  )', [req.body.serial_number, req.body.pin]);
//         res.send(results).end()
//     } catch (error) {
//         res.sendStatus(401).end()
//     }
//     finally {
//         if (connection) {
//             connection.release();
//         }
//     }

// });

//console.log('fridges.stack');
//console.log(fridges.stack);

module.exports = login;
