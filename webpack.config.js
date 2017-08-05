const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'dist');
const APP_DIR = path.resolve(__dirname, 'src');

const IS_PROD = process.env.NODE_ENV === 'production';

const getPlugins = function getPlugins() {
  const plugins = [];

  // Always expose NODE_ENV to webpack, you can now use `process.env.NODE_ENV`
  // inside your code for any environment checks; UglifyJS will automatically
  // drop any unreachable code.
  // console.log(process.env.NODE_ENV);
  plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: process.env.NODE_ENV
      }
    })
  );

  // Conditionally add plugins for Production builds.
  if (IS_PROD) {
    plugins.push(new webpack.optimize.UglifyJsPlugin());
  } else {
    // Conditionally add plugins for Development
    // ...
  }

  return plugins;
};
const config = {
  entry: `${APP_DIR}/index.jsx`,
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  plugins: getPlugins(),
  module: {
    rules: [
      {
        enforce: 'pre',
        include: APP_DIR,
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.(js|jsx)$/,
        include: APP_DIR,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader?cacheDirectory=true',
          options: {
            presets: [
              [
                'env',
                {
                  targets: {
                    browsers: ['last 2 versions']
                  },
                  debug: true
                }
              ],
              'stage-0',
              'react'
            ]
          }
        }
      }
    ]
  }
};

module.exports = config;
