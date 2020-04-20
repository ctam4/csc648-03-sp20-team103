const express = require('express');
const login = express.Router();

const pool = require('../../database.js');
let connection;

login.post('/', async (req, res) => {
    try {
        connection = await pool.getConnection();
        // let sql = 'INSERT INTO v2_sessions (session, fridge_id, logged_in_ts, expires_ts) VALUES(12334, 5, 6, 7) IF EXISTS(SELECT * FROM v2_fridges WHERE pin=' 
        // let sql = 'IF EXISTS(SELECT * FROM v2_fridges WHERE pin =1 ' + [req.body.pin] + ' AND serial_number=' + [req.body.serial_number] + ') INSERT INTO v2_sessions (session) VALUES(' + id + ')';
        let id = Math.floor(Math.random() * 100);
        let sql = 'IF EXISTS(SELECT * FROM v2_fridges WHERE pin =1 AND serial_number=1) INSERT INTO v2_sessions (session) VALUES(1)';
        console.log(sql)
        await connection.query(sql)
            .then((results) => {
                res.send(JSON.stringify(results)).end()
                // res.json(results).end();
            });
    } catch (error) {
        res.sendStatus(401).end()
    }
    finally {
        if (connection) {
            connection.release();
        }
    }

});

//console.log('fridges.stack');
//console.log(fridges.stack);

module.exports = login;
