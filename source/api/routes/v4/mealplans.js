const express = require('express');
const fetch = require('node-fetch');
const pool = require('../../database.js');
const recipesHelper = require('./functions/recipes.js');

const mealplans = express.Router();
let connection;

/**
 * PATCH /mealplans
 * @description Updates an existing meal plan entry.
 * @param {string} session
 * @param {integer} mealPlanID
 * @param {integer} recipeID
 */
mealplans.patch('/', async (req, res) => {
  const session = req.body.session;
  const mealPlanID = Number.parseInt(req.body.mealPlanID, 10);
  const recipeID = Number.parseInt(req.body.recipeID, 10);
  if (typeof session !== 'string' || session.length !== 36 || Number.isNaN(mealPlanID)
    || mealPlanID < 0 || Number.isNaN(recipeID) || recipeID < 0) {
    res.sendStatus(400).end();
    return;
  }
  try {
    connection = await pool.getConnection();
    let rows = await connection.query('SELECT fridge_id FROM v4_sessions WHERE session=?', [session]);
    if (rows.length > 0) {
      rows = connection.query('UPDATE meal_plans SET recipe_id=? WHERE meal_plan_id=?', [recipeID, mealPlanID]);
      if (rows.affectedRows > 0) {
        res.sendStatus(200).end();
      } else {
        res.sendStatus(406);
      }
    } else {
      res.sendStatus(401).end();
    }
  } catch (error) {
    res.sendStatus(500).end();
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
});

/**
 * GET /v4/mealplans
 * @description Returns the mealplan for a specific day (generates one if it doesn't exist).
 * @param {string} session
 * @param {integer} userID
 * @param {integer} plannedDate must be midnight
 * @returns {object[]} mealplans
 */
mealplans.get('/', async (req, res) => {
  const session = req.query.session;
  const userID = Number.parseInt(req.query.userID, 10);
  const plannedDate = Number.parseInt(req.query.plannedDate, 10);
  if (typeof session !== 'string' || session.length !== 36 || Number.isNaN(userID)
    || Number.isNaN(plannedDate) || userID < 0 || plannedDate < 0) {
    res.sendStatus(400).end();
    return;
  }
  const date = new Date(plannedDate);
  if (date.getUTCSeconds() !== 0 || date.getUTCMinutes() !== 0 || date.getUTCHours() !== 0) {
    res.sendStatus(400).end();
    return;
  }
  try {
    connection = await pool.getConnection();
    let rows = await connection.query('SELECT fridge_id FROM v4_sessions WHERE session=?', [session]);
    if (rows.length > 0) {
      const fridgeID = rows[0].fridge_id;
      rows = await connection.query('SELECT meal_plan_id as mealPlanID, user_id as userID, recipe_id as recipeID, planned_ts as plannedTS from v4_meal_plans WHERE planned_ts >= FROM_UNIXTIME(?) AND planned_ts < FROM_UNIXTIME(?)', [plannedDate, plannedDate + 60 * 60 * 24]);
      if (rows.length > 0) { // mealplan already generated, return it
        res.json(rows.filter((_, index) => index !== 'meta')).end();
      } else { // generate mealplan
        const ingredientIDs = await connection.query('SELECT ingredient_id FROM v4_inventory WHERE fridge_id=? AND total_quantity > 0', [fridgeID]);
        const ingredientNames = await Promise.all(ingredientIDs.map(async (ingredientID, index) => {
          if (index !== 'meta') {
            const ingredientName = await connection.query('SELECT name FROM v4_ingredients WHERE ingredient_id=?', [ingredientID]);
            if (ingredientName.length > 0) {
              return ingredientName[0].name;
            }
          }
          return undefined;
        }));
        let recipes;
        await fetch(`https://api.spoonacular.com/recipes/findByIngredients/?ingredients=${ingredientNames.join(',')}&number=3&ranking=2&ignorePantry=true&apiKey=bd1784451bab4f47ac234225bd2549ee`, {
          method: 'get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
          .then((res2) => {
            if (!res2.ok) {
              throw new Error(`error: ${res2.status}`);
            }
            return res2.json();
          })
          .then((data) => {
            recipes = data.map((recipe) => recipe.id);
          });
        if (recipes.length > 0) {
          await recipesHelper.importRecipes(connection, recipes);
          recipes = await Promise.all(recipes.map(async (recipeID, index) => {
            if (index !== 'meta') {
              const results = await connection.query('INSERT INTO v4_meal_plans (user_id, recipe_id, planned_ts) VALUES (?, ?, ?)', [userID, recipeID, plannedDate]);
              if (results.affectedRows > 0) {
                return {
                  mealPlanID: results.insertId,
                  recipeID,
                };
              }
              throw new Error('could not insert into meal_plans');
            }
            return undefined;
          }));
          res.json(recipes).end();
        } else {
          res.sendStatus(406).end();
        }
      }
    } else {
      res.sendStatus(401).end();
    }
  } catch (error) {
    res.sendStatus(500).end();
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
});

module.exports = mealplans;
