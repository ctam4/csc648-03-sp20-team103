const express = require('express');
const ingredients = express.Router();

const pool = require('../../database.js');
let connection;


ingredients.get('/', async (req, res) => {
    try {
        connection = await pool.getConnection();
        await connection.query('SELECT * FROM v2_ingredients')
            .then((results) => {
                // res.send(JSON.stringify(results)).end()
                res.json(results).end();
            });
    } catch (error) {
        res.sendStatus(401).end();
        throw error;
    } finally {
        if (connection) {
            connection.release(); // release to pool
        }
    }
});

module.exports = ingredients