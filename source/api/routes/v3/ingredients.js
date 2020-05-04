const express = require('express');
const ingredients = express.Router();

const pool = require('../../database.js');
let connection;

/**
 * GET /v3/ingredients/search
 * @description Retrieve ingredients list of current fridges with session.
 * @param {string} session
 * @param {string} query
 * @param {integer} page (optional)
 * @param {integer} limit (optional)
 * @returns {object[]} ingredients
 */
ingredients.get('/search', async (req, res) => {
  // check correct params
  if ((Object.keys(req.query).length == 2 ||
  (Object.keys(req.query).length == 4 && !('page' in req.query && 'limit' in req.query))) &&
  !('session' in req.query && 'query' in req.query)) {
    res.sendStatus(400).end();
    return;
  }
  // check params data type
  let session, query, page, limit;
  try {
    session = req.query.session;
    query = req.query.query;
    page = (req.query.page && parseInt(req.query.page)) || 1;
    limit = (req.query.limit && parseInt(req.query.limit)) || 20;
  } catch (error) {
    res.sendStatus(400).end();
    throw error;
  }
  // check params data range
  if (page <= 0 || limit <= 0) {
    res.sendStatus(400).end();
    return;
  }
  // run query to mariadb
  try {
    connection = await pool.getConnection();
    // retrieve fridge_id
    connection.query('SELECT fridge_id FROM v3_sessions WHERE session=?', [session])
      .then(async (rows) => {
        if (rows.length > 0) {
          // @todo handle possible duplicate sessions
          const fridgeID = rows[0].fridge_id;
          // retrieve for endpoint
          await fetch('https://api.spoonacular.com/food/ingredients/autocomplete?query=' + query + '&number=' + limit + '&apiKey=bd1784451bab4f47ac234225bd2549ee', {
            method: 'get',
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((res) => {
              if (!res.ok) {
                throw new Error('error ' + res.status);
              }
              return res.json();
            })
            .then((data) => {
              if (data.length > 0) {
                // parse date format
                let results = [];
                data.map((item) => {
                  results.push({
                    ingredientID: item.id,
                    name: item.name,
                    image: item.image,
                  });
                });
                res.json(results).end();
              } else {
                res.sendStatus(406).end();
              }
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

ingredients.post('/', async (req, res) => {
  try {
    connection = await pool.getConnection();
    await connection.query('INSERT INTO v3_ingredients (ingredient_id, name, image) VALUES(?, ?, ?)', [req.body.ingredient_id, req.body.name, req.body.image])
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

module.exports = ingredients;
