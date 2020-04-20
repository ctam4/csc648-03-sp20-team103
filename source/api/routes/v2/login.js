const express = require('express');
const login = express.Router();

const pool = require('../../database.js');
let connection;
let someVar = []

login.post('/', async (req, res) => {
    try {
        connection = await pool.getConnection();
        let sql = 'SELECT count(*) FROM v2_fridges WHERE pin=' + [req.body.pin] + ' AND serial_number=' + [req.body.serial_number];
        let sql2 = 'INSERT INTO v2_sessions(session) VALUES(UUID())'
        let id = Math.floor(Math.random() * 100);
        // let sql = 'INSERT INTO v2_sessions (session, fridge_id) VALUES(3131, 1)';
        // console.log(sql)
        await connection.query(sql)
            .then(connection.query(sql2))
            .then((results) => res.send(JSON.stringify(results)).end())
                // res.json(results).end();
            .catch((error) => {
                console.log(error)
                res.sendStatus(400).end()
            });
    } catch (error) {
        console.log(error)
        res.sendStatus(401).end()
    }
    finally {
        if (connection) {
            connection.release();
        }
    }

});

//for testing
login.get('/', async (req, res) => {
    try {
        connection = await pool.getConnection();
        let sql = 'SELECT * FROM v2_sessions';
        await connection.query(sql)
            .then((results) => {
                res.send(JSON.stringify(results)).end()
                // res.json(results).end();
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

//for testing
login.delete('/', async (req, res) => {
    try {
        connection = await pool.getConnection();
        let sql = 'DELETE FROM v2_sessions';
        await connection.query(sql)
            .then((results) => {
                res.send(JSON.stringify(results)).end()
                // res.json(results).end();
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

//console.log('fridges.stack');
//console.log(fridges.stack);

module.exports = login;
