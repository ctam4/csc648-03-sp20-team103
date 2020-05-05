const test = require('ava');
const waitPort = require('wait-port');
const fetch = require('node-fetch');

test.before(async (t) => {
  await waitPort({
    host: process.env.API_HOST || 'localhost',
    port: (process.env.API_PORT && parseInt(process.env.API_PORT)) || 8080,
    output: 'silent',
    timeout: 5,
  })
    .then(() => {
      t.context.baseUrl = 'http://' + (process.env.API_HOST || 'localhost') + ':' + (process.env.API_PORT && parseInt(process.env.API_PORT) || 8080);
    });
});

test.serial('/register | POST | 200', async (t) => {
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
      t.context.serialNumber = data.serialNumber;
      t.context.pin = data.pin;
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
      serialNumber: 1234,
      pin: '',
    }),
  })
    .then((res) => {
      t.is(res.status, 400);
    });
});

test.serial('/login | POST | 200', async (t) => {
  console.log(JSON.stringify({
    serialNumber: t.context.serialNumber,
    pin: t.context.pin,
  }));
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
      t.is(Object.keys(data).length, 1);
      t.true('session' in data);
      t.is(typeof data.session, 'string');
      t.is(data.session.length, 36);
      t.context.session = data.session;
    });
});
