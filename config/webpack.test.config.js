const { merge } = require('webpack-merge')
const base = require('./webpack.base.config')

/** @type {import('webpack').Configuration} */
const webpackConfig = merge(base, {
  devtool: 'inline-source-map'
})

delete webpackConfig.entry
delete webpackConfig.output

module.exports = webpackConfig
