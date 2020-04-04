import React from 'react';
import { AppRegistry } from 'react-native';

import App from '../components/horizontal-prototype/App';

AppRegistry.registerComponent('App', () => App);

AppRegistry.runApplication('App', {
  initialProps: {},
  rootTag: document.getElementById('react-root')
});
