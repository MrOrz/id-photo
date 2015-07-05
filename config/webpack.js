var webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    constants = require('./constants');

module.exports = {
  entry: {
    index: ['./js/index.jsx']
  },
  output: {
    // __dirname is the path of webpack.js
    path: __dirname + '/../build',
    filename: 'index.js',
    publicPath: 'build/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/, loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'css-loader?sourceMap!postcss-loader'
        )
      },
      {
        test: /\.(?:svg|png)$/,
        loader: 'url-loader?limit=1000' // Use DataURL for files under 1kb
      }
    ]
  },
  plugins: [new ExtractTextPlugin('index.css')],
  postcss: [require('autoprefixer-core'), require('csswring')({map: true})],
  debug: !constants.IS_PRODUCTION,
  devtool: constants.IS_PRODUCTION ? undefined : 'source-map',

  devServer: {
    host: '0.0.0.0',
    port: constants.PORT,
    hot: true
  }
};

if (constants.IS_PRODUCTION) {
  module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin({
    sourceMap: false
  }));
} else {
  module.exports.entry.index.unshift('webpack-dev-server/client?/', 'webpack/hot/dev-server');
  module.exports.plugins.push(new webpack.HotModuleReplacementPlugin());
}
