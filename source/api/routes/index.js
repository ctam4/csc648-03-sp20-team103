const express = require('express');
const router = express.Router();

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

    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    connectionLimit: 5,
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
        res.end(JSON.stringify(results.user_id));
    });
});

app.post('/users', function (req, res) {
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
        res.end(JSON.stringify(results.fridge_id));
    });
});

app.post('/fridges', function (req, res) {
    var postData = req.body;
    connection.query('INSERT INTO fridges SET ?', postData, function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});

//inventory
app.post('/inventory', function (req, res) {
    var postData = req.body;
    connection.query('INSERT INTO inventory SET ?', postData, function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});

app.get('/inventory', function (req, res) {
    connection.query('select * from inventory where inventory_id>=? LIMIT ?', [req.params.begin], [req.params.limit], function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results.inventory_id));
    });
});




app.use(compression());

app.use('/', indexRoute);

http.createServer(app).listen(httpPort);
https.createServer(httpsOptions, app).listen(httpsPort);
