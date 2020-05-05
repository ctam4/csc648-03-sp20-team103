const test = require('ava');
const fetch = require("node-fetch");
let loginDetails;
let session;
let apiUrl = "http:" + '//' + "localhost:8080";
if (process.env.API_PORT) {
    apiUrl += ':' + process.env.API_PORT;
}

const request = async () => {
    const response = await fetch(apiUrl + '/v3/register', {
        method: 'post'
    })
    const json = await response.json();
    return json;
}

test.serial.before('login', async t => {
    loginDetails = await request();
    t.true("serialNumber" in loginDetails && "pin" in loginDetails && Object.keys(loginDetails).length === 2);
    t.true(loginDetails.serialNumber.length === 10 && loginDetails.pin.length === 4);
});

test('login', async t => {
    const login_request = async () => {
        const login_response = await fetch(apiUrl + '/v3/login', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginDetails)
        })
        const json = await login_response.json();
        return json.session;
    }
    session = await login_request();
    console.log(session);
    t.true(typeof session === "string" && session.length === 36);
});