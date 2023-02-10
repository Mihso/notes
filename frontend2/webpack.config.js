const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const {SourceMapDevToolPlugin} = require('webpack')

module.exports = {
  entry: './index.tsx',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js',
    publicPath: '/'
  },
  target: 'web',
  devServer: {
    port: '5000',
    static: {
      directory: path.join(__dirname, 'public')
    },
    magicHtml: true,
    historyApiFallback: true,
    open: true,
    hot: true,
    liveReload: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, 
        exclude: /node_modules/,
        enforce: 'pre', 
        use: ['babel-loader','source-map-loader'], 
      },
      {
      test: /\.(ts|tsx)?$/,
      exclude: /node_modules/,
      enforce: "pre",
      use: ['ts-loader', 'source-map-loader'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.json?$/,
        exclude : /node_modules/,
        use: ['cson-loader']

      },
    ],
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', '/index.html'),
      publicPath: '/',
    }),
    new SourceMapDevToolPlugin({
      filename: "[file].map"
    }),
  ]
};