const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

/** @type {import('webpack').Configuration} */
const webpackConfig = {
  mode: 'production',
  target: 'web',
  entry: path.resolve(__dirname, '../src/index.js'),
  devtool: 'source-map',
  experiments: {
    outputModule: false
  },
  output: {
    library: {
      name: 'vue-js-modal',
      type: 'umd'
    },
    filename: 'dummy.js', // will be overwritten by the other webpack config implementations
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/'
  },
  externals: {
    vue: 'vue'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        parallel: true,
        terserOptions: {
          sourceMap: true
        }
      }),
      new CssMinimizerPlugin()
    ]
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      }
    ]
  },
  plugins: [new VueLoaderPlugin()]
}

module.exports = webpackConfig
