const express = require('express');
const users = express.Router();

const pool = require('../../database.js');
let connection;

//users

users.get('/:name', function (req, res) {
    try {
        connection = await pool.getConnection();
        await connection.query('select user_id from users where name =?', [req.query.name], function (error, results, fields) {
            res.json(results.user_id);
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

users.post('/', function (req, res) {
    try {
        connection = await pool.getConnection();
        await connection.query('INSERT INTO users SET ?', req.body, function (error, results, fields) {
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

module.exports = users;
