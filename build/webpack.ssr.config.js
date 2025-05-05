const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const webpack = require('webpack')

module.exports = merge(base, {
  target: 'node',
  output: {
    filename: 'ssr.index.js'
  },
  plugins: [
    new webpack.IgnorePlugin(/^node:/),
    // new webpack.NormalModuleReplacementPlugin(/^node:stream$/, 'stream')
  ]
})
