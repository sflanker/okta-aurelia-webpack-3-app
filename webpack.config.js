'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var { TsConfigPathsPlugin, CheckerPlugin } = require('awesome-typescript-loader');
var { AureliaPlugin } = require('aurelia-webpack-plugin');
var pkg = require('./package.json');

module.exports = {
  entry: {
    app: ['babel-polyfill', 'aurelia-bootstrapper'],
    vendor: [
      'materialize-css'
    ]
  },

  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules'
    ],
    alias: {
      styles: path.resolve(__dirname, 'styles')
    },
    extensions: ['.ts', '.js', '.scss']
  },

  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].[hash].bundle.js',
    sourceMapFilename: '[name].[hash].bundle.map',
    chunkFilename: '[hash].chunk.js',
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            retainLines: true
          }
        }
      },
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/,
        options: {
          useBabel: true
        }
      },
      { test: /\.json$/i, loader: 'json-loader' },
      {
        test: /\.css?$/,
        issuer: [{ not: [{ test: /\.html$/i }] }],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{ loader: 'css-loader' }]
        })
      },
      {
        test: /\.css$/i,
        issuer: [{ test: /\.html$/i }],
        // CSS required in templates cannot be extracted safely
        // because Aurelia would try to require it again in runtime
        use: [
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.scss?$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: { minifyCSS: false }
      },
      {
        test: /\.(png|gif|jpg|svg|ttf|eot|woff)$/,
        loader: 'file-loader',
      },
    ]
  },

  plugins: [
    new AureliaPlugin({
      features: { ie: true, svg: true, unparser: false, polyfills: "es2015" }
    }),
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin(
      { names: ['app'], filename: '[name].[hash].bundle.js' }
    ),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.DefinePlugin({
      'process.env.APPLICATION_VERSION': JSON.stringify(process.env.APPLICATION_VERSION || pkg.version)
    }),
    new HtmlWebpackPlugin({
      title: 'Generic Webpack App ' + pkg.version,
      version: pkg.version,
      template: 'index.ejs',
      filename: 'index.html',
      chunksSortMode: 'dependency'
    }),
    new TsConfigPathsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],

  // Using the suggestion from here: https://github.com/webpack/webpack/issues/2145#issuecomment-294361203
  devtool: 'cheap-module-eval-source-map',

  devServer: {
    host: '0.0.0.0',
    public: '43303096-9e6c-49f9-aecf-ee46cdc78265.id.repl.co',
    disableHostCheck: true,
    port: process.env.PORT || 3000,
    hot: true,

    /*
     * Webpack Dev Server utilizes the 'connect-history-api-fallback'
     * NPM module to rewrite URLs invoked from the browser to the
     * location where the assets are actually stored.
     *
     * Since this a single page application using the HTML 5 History API,
     * we need the relative URLs from paths to load assets from the root
     * of the server. For example, we may rewrite a relative link to a
     * font from 'http://host/route-url/foo.woff' to 'http://host/foo.woff'.
     */
    historyApiFallback: {
      index: '/index.html',
      rewrites: [
        {
          from: /\.[a-f0-9]{20}\.(bundle|chunk)\.js$/,
          to: function (context) {
            return '/' + path.basename(context.parsedUrl.pathname);
          }
        },
        {
          from: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          to: function (context) {
            return '/' + path.basename(context.parsedUrl.pathname);
          }
        }
      ]
    }
  }
};
