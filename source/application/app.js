"use strict";

const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const app = express();
const httpPort = 80;
const httpsPort = 443;
const httpsOptions = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert'),
};
const compression = require('compression');
const staticOptions = {
  index: false,
  redirect: false,
};

app.use(compression());

app.use('/about-team', express.static('about-team'));
app.use('/', require('./routes/index.js'));
app.use(/^\/(.*)\.(?!html|htm)(.+)\/?(?=\/|$)/i, (req, res, next) => {
  req.url = path.basename(req.originalUrl);
  express.static('build', staticOptions)(req, res, next);
});

http.createServer(app).listen(httpPort);
https.createServer(httpsOptions, app).listen(httpsPort);
