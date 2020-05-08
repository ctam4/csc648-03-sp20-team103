const test = require('ava');
const waitPort = require('wait-port');
const fetch = require('node-fetch');

test.before(async (t) => {
  // start test server
  try {
    const express = require('express');
    const http = require('http');
    const app = express();
    const httpPort = 20005;
    const compression = require('compression');
    app.use(express.json());
    app.use(compression());
    app.use('/horizontal-prototype', require('../../routes/horizontal-prototype.js'));
    app.use(/^\/(.*)\.(?!html|htm)(.+)\/?(?=\/|$)/i, (req, res, next) => {
      req.url = path.basename(req.originalUrl);
      express.static('../../build', staticOptions)(req, res, next);
    });
    http.createServer(app).listen(httpPort);
  } catch (error) {
    t.log(error);
  }
  await waitPort({
    host: 'localhost',
    port: 20005,
    output: 'silent',
    timeout: 5,
  })
    .then(async () => {
      t.context.baseUrl = 'http://localhost:20005';
    });
});

test('/consumption | GET | 200', async (t) => {
  await fetch(t.context.baseUrl + '/horizontal-prototype/consumption')
    .then((res) => {
      t.is(res.status, 200);
    });
});

test('/consumption/view | GET | 200', async (t) => {
  await fetch(t.context.baseUrl + '/horizontal-prototype/consumption/view')
    .then((res) => {
      t.is(res.status, 200);
    });
});
