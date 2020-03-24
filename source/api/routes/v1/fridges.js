const express = require('express');
const fridges = express.Router();

const pool = require('../../database.js');
let connection;

//fridges

fridges.get('/:user_id', function (req, res) {
    try {
        connection = await pool.getConnection();
        await connection.query('select fridge_id from fridges where user_id =?', [req.query.user_id], function (error, results, fields) {
            res.json(results.fridge_id);
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

fridges.post('/', function (req, res) {
    try {
        connection = await pool.getConnection();
        await connection.query('INSERT INTO fridges SET ?', req.body, function (error, results, fields) {
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

module.exports = fridges;
