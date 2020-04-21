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

router.get('/inventory/view', async (req, res) => {
  const raw = fs.readFileSync('./build/horizontal-prototype_inventory-view.html').toString();
  const handlebarsTemplate = handlebars.compile(raw);
  const render = handlebarsTemplate({
    title: "View - Inventory - Horizontal prototype",
  });
  res.send(render);
});

router.get('/inventory/search', async (req, res) => {
  const raw = fs.readFileSync('./build/horizontal-prototype_inventory-search.html').toString();
  const handlebarsTemplate = handlebars.compile(raw);
  const render = handlebarsTemplate({
    title: "Search - Inventory - Horizontal prototype",
  });
  res.send(render);
});

router.get('/inventory/add', async (req, res) => {
  const raw = fs.readFileSync('./build/horizontal-prototype_inventory-add.html').toString();
  const handlebarsTemplate = handlebars.compile(raw);
  const render = handlebarsTemplate({
    title: "Add - Inventory - Horizontal prototype",
  });
  res.send(render);
});


router.get('/inventory/addBarcode', async (req, res) => {
  const raw = fs.readFileSync('./build/horizontal-prototype_inventory-add-barcode.html').toString();
  const handlebarsTemplate = handlebars.compile(raw);
  const render = handlebarsTemplate({
    title: "Add Barcode - Inventory - Horizontal prototype",
  });
  res.send(render);
});

router.get('/inventory/scanReciept', async (req, res) => {
  const raw = fs.readFileSync('./build/horizontal-prototype_inventory-scan-reciept.html').toString();
  const handlebarsTemplate = handlebars.compile(raw);
  const render = handlebarsTemplate({
    title: "Scan Reciept - Inventory - Horizontal prototype",
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

router.get('/meal-plans', async (req, res) => {
  const raw = fs.readFileSync('./build/horizontal-prototype_meal-plans.html').toString();
  const handlebarsTemplate = handlebars.compile(raw);
  const render = handlebarsTemplate({
    title: "Meal Plans - Horizontal prototype",
  });
  res.send(render);
});



module.exports = router;
