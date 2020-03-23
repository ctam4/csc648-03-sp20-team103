const express = require('express');
const index = express.Router();

/*
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
*/
/*
//users
router.get('/users/:name', function (req, res) {
  connection.query('select user_id from users where name =?', [req.params.name], function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results.user_id));
  });
});

router.post('/users', function (req, res) {
  var postData = req.body;
  connection.query('INSERT INTO users SET ?', postData, function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

//fridges
router.get('/fridges/:user_id', function (req, res) {
  connection.query('select fridge_id from fridges where user_id=?', [req.params.user_id], function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results.fridge_id));
  });
});

router.post('/fridges', function (req, res) {
  var postData = req.body;
  connection.query('INSERT INTO fridges SET ?', postData, function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});
*/

index.get('/', (req, res) => res.sendStatus(401));

index.use('/inventory', require('./inventory.js'));

//console.log('index.stack');
//console.log(index.stack);

module.exports = index;
