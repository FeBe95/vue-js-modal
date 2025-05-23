const { merge } = require('webpack-merge')
const baseNoCss = require('./webpack.base-no-css.config')

/** @type {import('webpack').Configuration} */
const webpackConfig = merge(baseNoCss, {
  output: {
    filename: 'index.nocss.js'
  }
})

module.exports = webpackConfig
