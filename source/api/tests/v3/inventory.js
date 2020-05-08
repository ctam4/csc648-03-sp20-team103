const test = require('ava');
const waitPort = require('wait-port');
const fetch = require('node-fetch');

test.before(async (t) => {
  // start test server
  try {
    const express = require('express');
    const http = require('http');
    const app = express();
    const httpPort = 10003;
    const compression = require('compression');
    const cors = require('cors');
    app.use(express.json());
    app.use(compression());
    app.use(cors());
    app.use('/v3', require('../../routes/v3/index.js'));
    http.createServer(app).listen(httpPort);
  } catch (error) {
    t.log(error);
  }
  await waitPort({
    host: 'localhost',
    port: 10003,
    output: 'silent',
    timeout: 5,
  })
    .then(async () => {
      t.context.baseUrl = 'http://localhost:10003';
      await fetch(t.context.baseUrl + '/v3/register', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then(async (data) => {
          t.context.serialNumber = data.serialNumber;
          t.context.pin = data.pin;
          await fetch(t.context.baseUrl + '/v3/login', {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              serialNumber: t.context.serialNumber,
              pin: t.context.pin,
            }),
          })
            .then((res2) => res2.json())
            .then((data2) => {
              t.context.session = data2.session;
            });
        }).then(async () => {
          await fetch(t.context.baseUrl + '/v3/users', {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: 'Siddhita1',
              role: 'Student',
              intolerances: ['seafood'],
              session: t.context.session,
            }),
          })
            .then((res) => {
              t.is(res.status, 200);
              return res.json();
            })
            .then((data) => {
              t.context.userID = data.userID;
              t.is(Object.keys(data).length, 1);
              t.true('userID' in data);
              t.is(typeof data.userID, 'number');
            });
        }).then(async () => {
          await fetch(t.context.baseUrl + '/v3/ingredients', {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ingredientID: Math.floor(Math.random() * 10000000),
              name : Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
              image: 'image1',
              session: t.context.session,
            }),
          })
            .then((res3) => res3.json())
            .then((data3) => {
              t.context.ingredientID = data3.ingredientID;
            });
        });
    });
});

test('/inventory/list | GET | 406', async (t) => {
  await fetch(t.context.baseUrl + '/v3/inventory/list/stored?session='+ t.context.session+'&page=1&limit=10', {
    method: 'get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
    .then((res) => {
      t.is(res.status, 406);
    });
});
test('/inventory/list | GET | 401', async (t) => {
  await fetch(t.context.baseUrl + '/v3/inventory/list/stored?session=123456789012345678901234567890123456&page=1&limit=10', {
    method: 'get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
    .then((res) => {
      t.is(res.status, 401);
    });
});
test('/inventory/list | GET | 400', async (t) => {
  await fetch(t.context.baseUrl + '/v3/inventory/list/stored?session=123456789012345678&page=1&limit=10', {
    method: 'get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
    .then((res) => {
      t.is(res.status, 400);
    });
});

test('/inventory/add/manual | POST | 200', async (t) => {
  await fetch(t.context.baseUrl + '/v3/inventory/add/manual', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userID: t.context.userID,
      ingredientID: t.context.ingredientID,
      totalQuantity: "1",
      unit: "stedt",
      expirationDate: 23455,
      price:"12",
      session: t.context.session,
    }),
  })
    .then((res) => {
      t.is(res.status, 200);
      return res.json();
    })
    .then((data) => {
    t.is(Object.keys(data).length, 1);
    t.true('inventoryID' in data);
  });
});

test('/inventory/add/manual | POST | 401', async (t) => {
  await fetch(t.context.baseUrl + '/v3/inventory/add/manual', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userID: t.context.userID,
      ingredientID: t.context.ingredientID,
      totalQuantity: "1",
      unit: "stedt",
      expirationDate: 23455,
      price:"12",
      session: '123456789012345678901234567890123456',
    }),
  })
    .then((res) => {
      t.is(res.status, 401);
    });
});

test('/inventory/add/manual | POST | 400', async (t) => {
  await fetch(t.context.baseUrl + '/v3/inventory/add/manual', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userID: t.context.userID,
      ingredientID: t.context.ingredientID,
      totalQuantity: "-1",
      unit: "stedt",
      expirationDate: 23455,
      price:"12",
      session: t.context.session,
    }),
  })
    .then((res) => {
      t.is(res.status, 400);
    });
});

test('/inventory/list | GET | 200', async (t) => {
  await fetch(t.context.baseUrl + '/v3/inventory/add/manual', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userID: t.context.userID,
      ingredientID: t.context.ingredientID,
      totalQuantity: "10",
      unit: "stedt",
      expirationDate: 23455,
      price:"12",
      session: t.context.session,
    }),
  })
    .then((res) => {
      t.is(res.status, 200);
      return res.json();
    })
    .then((data) => {
      t.is(Object.keys(data).length, 1);
      t.true('inventoryID' in data);
    })
    .then(async () => {
      await fetch(t.context.baseUrl + '/v3/inventory/list/stored?session='+ t.context.session+'&page=1&limit=10', {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
    .then((res) => {
      t.is(res.status, 200);
    });
    });
});