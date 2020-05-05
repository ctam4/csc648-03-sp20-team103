const test = require('ava');
const waitPort = require('wait-port');
const fetch = require('node-fetch');

test.before(async (t) => {
  // start test server
  try {
    const express = require('express');
    const http = require('http');
    const app = express();
    const httpPort = 10000;
    const compression = require('compression');
    const cors = require('cors');
    app.use(express.json());
    app.use(compression());
    app.use(cors());
    app.use('/v3', require('../routes/v3/index.js'));
    http.createServer(app).listen(httpPort);
  } catch (error) {
    t.log(error);
  }
  await waitPort({
    host: 'localhost',
    port: 10000,
    output: 'silent',
    timeout: 5,
  })
    .then(async () => {
      t.context.baseUrl = 'http://localhost:10000';
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
        });
    });
});

test('/register | POST | 200', async (t) => {
  await fetch(t.context.baseUrl + '/v3/register', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      t.is(res.status, 200);
      return res.json();
    })
    .then((data) => {
      t.is(Object.keys(data).length, 2);
      t.true('serialNumber' in data);
      t.true('pin' in data);
      t.is(data.serialNumber.length, 10);
      t.is(data.pin.length, 4);
    });
});

test('/login | POST | 400', async (t) => {
  await fetch(t.context.baseUrl + '/v3/login', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      serialNumber: '1234',
      pin: '',
    }),
  })
    .then((res) => {
      t.is(res.status, 400);
    });
});

test('/login | POST | 406', async (t) => {
  await fetch(t.context.baseUrl + '/v3/login', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      serialNumber: '1234',
      pin: '    ',
    }),
  })
    .then((res) => {
      t.is(res.status, 406);
    });
});

test('/login | POST | 200', async (t) => {
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
    .then((res) => {
      t.is(res.status, 200);
      return res.json();
    })
    .then((data) => {
      t.is(Object.keys(data).length, 3);
      t.true('session' in data);
      t.true('logged_in_ts' in data);
      t.true('expires_ts' in data);
      t.is(typeof data.session, 'string');
      t.is(data.session.length, 36);
    });
});

test('/logout | POST | 400', async (t) => {
  await fetch(t.context.baseUrl + '/v3/logout', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      session: 'abcd',
    }),
  })
    .then((res) => {
      t.is(res.status, 400);
    });
});

test('/logout | POST | 406', async (t) => {
  await fetch(t.context.baseUrl + '/v3/logout', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      session: '123456789012345678901234567890123456',
    }),
  })
    .then((res) => {
      t.is(res.status, 406);
    });
});

test('/logout | POST | 200', async (t) => {
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
    .then((res) => res.json())
    .then(async (data) => {
      await fetch(t.context.baseUrl + '/v3/logout', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session: data.session,
        }),
      })
        .then((res2) => {
          t.is(res2.status, 200);
        });
    });
});
