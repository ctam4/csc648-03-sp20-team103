const express = require('express');
const fs = require('fs');
const router = express.Router();
const handlebars = require('handlebars');

router.get('/', async (req, res) => {
  const raw = fs.readFileSync('./build/horizontal-prototype.html').toString();
  const handlebarsTemplate = handlebars.compile(raw);
  const render = handlebarsTemplate({
    title: "Horizontal prototype",
  });
  res.send(render);
});

module.exports = router;
