const express = require('express');
const fetch = require('node-fetch');
const pool = require('../../database.js');

const convert = express.Router();
let connection;

/**
 * GET /v3/convert
 * @description Converts a quantity from one unit to another.
 * @param {string} session
 * @param {string} ingredient
 * @param {number} quantity
 * @param {string} sourceUnit
 * @param {string} targetUnit
 * @returns {number} newQuantity
 */
convert.post('/convert', async (req, res) => {
  // check param types
  const quantity = Number.parseFloat(req.query.quantity);
  const {
    session,
    ingredient,
    sourceUnit,
    targetUnit,
  } = req.query;
  if (typeof session !== 'string' || typeof ingredient !== 'string' || Number.isNaN(quantity)
    || quantity < 0 || typeof unit !== 'string' || typeof newUnit !== 'string'
    || session.length !== 36) {
    res.sendStatus(400).end();
    return;
  }
  try {
    connection = await pool.getConnection();
    await connection.query('SELECT 1 FROM v4_sessions WHERE session=?', [session])
      .then(async (rows) => {
        if (rows.length > 0) {
          await fetch(`https://api.spoonacular.com/recipes/convert?ingredientName=${ingredient}&sourceAmount=${quantity}&sourceUnit=${sourceUnit}&targetUnit=${targetUnit}&apiKey=bd1784451bab4f47ac234225bd2549ee`, {
            method: 'get',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          })
            .then((res2) => {
              if (!res2.ok) {
                throw new Error(`error ${res2.status}`);
              }
              return res2.json();
            })
            .then((data) => {
              res.json({ newQuantity: data.targetAmount }).end();
            });
        } else {
          res.sendStatus(401).end();
        }
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
