import React from 'react';
import ReactDOM from 'react-dom';

// import App from '../components/App.jsx';
import FridgeGet from '../components/FridgeGet.jsx';
import FridgePost from '../components/FridgePost.jsx';

// ReactDOM.hydrate(App, document.getElementById('root'));
ReactDOM.hydrate(FridgeGet, document.getElementById('FridgeGet'));
ReactDOM.hydrate(FridgePost, document.getElementById('FridgePost'));
