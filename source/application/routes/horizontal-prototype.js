const express = require('express');
const fs = require('fs');
const router = express.Router();
const handlebars = require('handlebars');

router.get('/', async (req, res) => {
  const raw = fs.readFileSync('./build/horizontal-prototype_splash.html').toString();
  const handlebarsTemplate = handlebars.compile(raw);
  const render = handlebarsTemplate({
    title: "Splash - Horizontal Prototype",
  });
  res.send(render);
});

router.get('/inventory', async (req, res) => {
  const raw = fs.readFileSync('./build/horizontal-prototype_inventory.html').toString();
  const handlebarsTemplate = handlebars.compile(raw);
  const render = handlebarsTemplate({
    title: "Inventory - Horizontal Prototype",
  });
  res.send(render);
});

router.get('/inventory/view', async (req, res) => {
  // TODO: check for id exits using fetch, return 404 if not found
  const raw = fs.readFileSync('./build/horizontal-prototype_inventory-view.html').toString();
  const handlebarsTemplate = handlebars.compile(raw);
  const render = handlebarsTemplate({
    title: "View - Inventory - Horizontal Prototype",
  });
  res.send(render);
});

router.get('/inventory/search', async (req, res) => {
  const raw = fs.readFileSync('./build/horizontal-prototype_inventory-search.html').toString();
  const handlebarsTemplate = handlebars.compile(raw);
  const render = handlebarsTemplate({
    title: "Search - Inventory - Horizontal Prototype",
  });
  res.send(render);
});

router.get('/inventory/add', async (req, res) => {
  const raw = fs.readFileSync('./build/horizontal-prototype_inventory-add.html').toString();
  const handlebarsTemplate = handlebars.compile(raw);
  const render = handlebarsTemplate({
    title: "Add - Inventory - Horizontal Prototype",
  });
  res.send(render);
});

router.get('/inventory/add/barcode', async (req, res) => {
  const raw = fs.readFileSync('./build/horizontal-prototype_inventory-add-barcode.html').toString();
  const handlebarsTemplate = handlebars.compile(raw);
  const render = handlebarsTemplate({
    title: "Add barcode - Inventory - Horizontal Prototype",
  });
  res.send(render);
});

router.get('/inventory/add/receipt', async (req, res) => {
  const raw = fs.readFileSync('./build/horizontal-prototype_inventory-add-receipt.html').toString();
  const handlebarsTemplate = handlebars.compile(raw);
  const render = handlebarsTemplate({
    title: "Add receipt - Inventory - Horizontal Prototype",
  });
  res.send(render);
});

router.get('/recipes', async (req, res) => {
  const raw = fs.readFileSync('./build/horizontal-prototype_recipes.html').toString();
  const handlebarsTemplate = handlebars.compile(raw);
  const render = handlebarsTemplate({
    title: "Recipes - Horizontal Prototype",
  });
  res.send(render);
});

router.get('/recipes/view', async (req, res) => {
  // TODO: check for id exits using fetch, return 404 if not found
  const raw = fs.readFileSync('./build/horizontal-prototype_recipes-view.html').toString();
  const handlebarsTemplate = handlebars.compile(raw);
  const render = handlebarsTemplate({
    title: "View - Recipes - Horizontal Prototype",
  });
  res.send(render);
});

router.get('/recipes/create', async (req, res) => {
  const raw = fs.readFileSync('./build/horizontal-prototype_recipes-create.html').toString();
  const handlebarsTemplate = handlebars.compile(raw);
  const render = handlebarsTemplate({
    title: "Create - Recipes - Horizontal Prototype",
  });
  res.send(render);
});

router.get('/recipes/search', async (req, res) => {
  const raw = fs.readFileSync('./build/horizontal-prototype_recipes-search.html').toString();
  const handlebarsTemplate = handlebars.compile(raw);
  const render = handlebarsTemplate({
    title: "Search - Recipes - Horizontal Prototype",
  });
  res.send(render);
});

router.get('/carts', async (req, res) => {
  const raw = fs.readFileSync('./build/horizontal-prototype_carts.html').toString();
  const handlebarsTemplate = handlebars.compile(raw);
  const render = handlebarsTemplate({
    title: "Carts - Horizontal Prototype",
  });
  res.send(render);
});

router.get('/consumption', async (req, res) => {
  const raw = fs.readFileSync('./build/horizontal-prototype_consumption.html').toString();
  const handlebarsTemplate = handlebars.compile(raw);
  const render = handlebarsTemplate({
    title: "Consumption - Horizontal Prototype",
  });
  res.send(render);
});

router.get('/meal-plans', async (req, res) => {
  const raw = fs.readFileSync('./build/horizontal-prototype_meal-plans.html').toString();
  const handlebarsTemplate = handlebars.compile(raw);
  const render = handlebarsTemplate({
    title: "Meal Plans - Horizontal Prototype",
  });
  res.send(render);
});

module.exports = router;