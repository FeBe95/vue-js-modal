const { merge } = require('webpack-merge')
const base = require('./webpack.base.config')

/** @type {import('webpack').Configuration} */
const webpackConfig = merge(base, {
  output: {
    filename: 'index.js'
  }
})

module.exports = webpackConfig
