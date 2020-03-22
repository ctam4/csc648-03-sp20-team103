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
const indexRoute = require('./routes/index.js');

const mariadb = require('mariadb');
const mariadbOptions = {
  host: "team103",
  user: "team103",
  password: "team103"
  // host: process.env.DB_HOST,
  // user: process.env.DB_USER,
  // password: process.env.DB_PASS,
  // connectionLimit: 5,
};
const pool = mariadb.createPool(mariadbOptions);
(async function asyncFunction() {
  let connection;
  try {
    connection = await pool.getConnection();
    const rows = await connection.query("SELECT 1 as val");
    // rows: [ {val: 1}, meta: ... ]
    //const res = await connection.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
    // res: { affectedRows: 1, insertId: 1, warningStatus: 0 }
  } catch (error) {
    throw error;
  } finally {
    if (connection) {
      connection.release(); // release to pool
    }
  }
})();

//users
app.get('/users/:name', function (req, res) {
  connection.query('select user_id from users where name =?', [req.params.name], function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

app.post('/users/:name/:fridge_id/:role'{
  var postData = req.body;
  connection.query('INSERT INTO users SET ?', postData, function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});
//fridges
app.get('/fridges/:user_id', function (req, res) {
  connection.query('select fridge_id from fridges where user_id=?', [req.params.user_id], function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

app.use(compression());

app.use('/', indexRoute);

http.createServer(app).listen(httpPort);
https.createServer(httpsOptions, app).listen(httpsPort);

