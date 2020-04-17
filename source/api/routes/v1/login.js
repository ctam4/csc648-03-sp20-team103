const express = require('express');
const login = express.Router();

const pool = require('../../database.js');
let connection;

// login.post('/login/:serial_number&:pin', async (req, res) => {
//     try {
//         connection = await pool.getConnection();
//         await connection.query('INSERT INTO sessions (session) VALUES (?, ?)', req.params.serial_number, req.params.pin)
//             .then((results) => {
//                 res.status(500).send(json(results)).end()
//                 // res.json(results).end();
//             });
//     } catch (error) {
//         res.sendStatus(500).end();
//         throw error;
//     } finally {
//         if (connection) {
//             connection.release(); // release to pool
//         }
//     }
// });

//console.log('fridges.stack');
//console.log(fridges.stack);

module.exports = login;
