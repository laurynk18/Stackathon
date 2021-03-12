const webpack = require('webpack')
const isDev = process.env.NODE_ENV === 'development'
//const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: [
    '@babel/polyfill', // enables async-await
    './client/index.js'
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map',
  watchOptions: {
    ignored: /node_modules/
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env', '@babel/react']
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
  // plugins: [
  //   new HtmlWebpackPlugin({title: 'react-map-gl Example'}),
  //   new webpack.EnvironmentPlugin(['MapboxAccessToken'])
  // ]
}
