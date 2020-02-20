const react = require('react');
const reactDOM = require('react-dom');
const appComponent = require('./app.js');

reactDOM.hydrate(appComponent, document.getElementById('reactElement'));
