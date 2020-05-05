const test = require('ava');
const fetch = require("node-fetch");

let apiUrl = "http:" + '//' + "localhost:8080";
if (process.env.API_PORT) {
    apiUrl += ':' + process.env.API_PORT;
}

const request = async () => {
    const response = await fetch(apiUrl + '/v3/register', {
        method: 'post'
    })
    return response;
}
test('registesr_test', async t => {
    const response = await request();
    const loginDetails = await response.json();
    t.true("serialNumber" in loginDetails && "pin" in loginDetails && Object.keys(loginDetails).length === 2);
    t.true(loginDetails.serialNumber.length === 10 && loginDetails.pin.length === 4);
    const status = await response.status;
    t.is(await status, 200);
});