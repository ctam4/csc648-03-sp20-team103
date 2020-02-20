const express = require('express');
const router = express.Router();
const react = require('react');
const reactDOMServer = require('react-dom/server');
const appComponent = require('../components/app.js');
const handlebars = require('handlebars');

router.get('/', async (req, res) => {
  const html = `
  <html>
  <head><title>My First SSR</title></head>
  <body>
  <h1>My First Server Side Render</h1>
  <div id="reactElement">{{{reactElement}}}</div>
  <script src="/app.js" charset="utf-8"></script>
  <script src="/vendor.js" charset="utf-8"></script>
  </body>
  </html>
  `;
  const handlebarsTemplate = handlebars.compile(html);
  const render = handlebarsTemplate({
    reactElement: reactDOMServer.renderToString(appComponent),
  });
  res.send(render);
});

module.exports = router;
