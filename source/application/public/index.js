import React from 'react';
import ReactDOM from 'react-dom';

let apiUrl = process.env.API_HOST || location.hostname;
if (process.env.API_PORT) {
  apiUrl += ':' + process.env.API_PORT;
}

// import App from '../components/App.jsx';
import FridgeGet from '../components/FridgeGet.jsx';
import FridgePost from '../components/FridgePost.jsx';

// ReactDOM.hydrate(App, document.getElementById('root'));
ReactDOM.hydrate(FridgeGet, document.getElementById('FridgeGet'));
ReactDOM.hydrate(FridgePost, document.getElementById('FridgePost'));
