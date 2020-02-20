const path = require('path');

const config = {
  mode: 'production',
  entry: {
    vendor: ['react'],
    app: ['./components/index.js'],
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.wasm', '.mjs', '*']
  },
  watch: true,
};

module.exports = config;
