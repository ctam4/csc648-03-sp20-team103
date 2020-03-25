"use strict";

const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');
const app = express();
const httpPort = 80;
const httpsPort = 443;
const httpsOptions = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert'),
};
const compression = require('compression');
const cors = require('cors');

app.use(express.json());
app.use(compression());
app.use(cors());

app.use('/v1', require('./routes/v1/index.js'));

app.get('/', (req, res) => res.sendStatus(401).end());

http.createServer(app).listen(httpPort);
https.createServer(httpsOptions, app).listen(httpsPort);
