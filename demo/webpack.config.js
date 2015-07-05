var webpack = require('webpack');

module.exports = {
  entry: {
    canvas: ['webpack-dev-server/client?/', 'webpack/hot/dev-server', './canvas.src.js'],
    webgl: ['webpack-dev-server/client?/', 'webpack/hot/dev-server', './webgl.src.js'],
    worker: ['webpack-dev-server/client?/', 'webpack/hot/dev-server', './worker.src.js'],
    workerprocess: ['./workerprocess.src.js']
  },
  output: {
    // __dirname is the path of webpack.config.js
    path: './',
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.src\.js$/, loader: 'babel-loader'
      }
    ]
  },
  debug: true,
  devtool: 'sourcemap',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      filename: "common.js",
      chunks: ['canvas', 'webgl', 'worker']
    })
  ],
  devServer: {
    host: '0.0.0.0',
    port: 5000,
    hot: true
  }
};