const express = require('express');
const fs = require('fs');
const router = express.Router();
const handlebars = require('handlebars');

router.get('/', async (req, res) => {
  const raw = fs.readFileSync('./build/horizontal-prototype_splash.html').toString();
  const handlebarsTemplate = handlebars.compile(raw);
  const render = handlebarsTemplate({
    title: "Splash - Horizontal prototype",
  });
  res.send(render);
});

router.get('/inventory', async (req, res) => {
  const raw = fs.readFileSync('./build/horizontal-prototype_inventory.html').toString();
  const handlebarsTemplate = handlebars.compile(raw);
  const render = handlebarsTemplate({
    title: "Inventory - Horizontal prototype",
  });
  res.send(render);
});

router.get('/recipes', async (req, res) => {
  const raw = fs.readFileSync('./build/horizontal-prototype_recipes.html').toString();
  const handlebarsTemplate = handlebars.compile(raw);
  const render = handlebarsTemplate({
    title: "Recipes - Horizontal prototype",
  });
  res.send(render);
});

router.get('/recipes/view', async (req, res) => {
  // TODO: req.query
  const raw = fs.readFileSync('./build/horizontal-prototype_recipes-view.html').toString();
  const handlebarsTemplate = handlebars.compile(raw);
  const render = handlebarsTemplate({
    title: "View - Recipes - Horizontal prototype",
  });
  res.send(render);
});

router.get('/recipes/create', async (req, res) => {
  const raw = fs.readFileSync('./build/horizontal-prototype_recipes-create.html').toString();
  const handlebarsTemplate = handlebars.compile(raw);
  const render = handlebarsTemplate({
    title: "Create - Recipes - Horizontal prototype",
  });
  res.send(render);
});

router.get('/recipes/search', async (req, res) => {
  const raw = fs.readFileSync('./build/horizontal-prototype_recipes-search.html').toString();
  const handlebarsTemplate = handlebars.compile(raw);
  const render = handlebarsTemplate({
    title: "Search - Recipes - Horizontal prototype",
  });
  res.send(render);
});

router.get('/carts', async (req, res) => {
  const raw = fs.readFileSync('./build/horizontal-prototype_carts.html').toString();
  const handlebarsTemplate = handlebars.compile(raw);
  const render = handlebarsTemplate({
    title: "Carts - Horizontal prototype",
  });
  res.send(render);
});

router.get('/consumption', async (req, res) => {
  const raw = fs.readFileSync('./build/horizontal-prototype_consumption.html').toString();
  const handlebarsTemplate = handlebars.compile(raw);
  const render = handlebarsTemplate({
    title: "Consumption - Horizontal prototype",
  });
  res.send(render);
});

router.get('/mealplans', async (req, res) => {
  const raw = fs.readFileSync('./build/horizontal-prototype_mealplans.html').toString();
  const handlebarsTemplate = handlebars.compile(raw);
  const render = handlebarsTemplate({
    title: "MealPlans - Horizontal prototype",
  });
  res.send(render);
});



module.exports = router;
