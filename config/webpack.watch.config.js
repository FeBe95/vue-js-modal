const { merge } = require('webpack-merge')
const client = require('./webpack.client.config')

/** @type {import('webpack').Configuration} */
const webpackConfig = merge(client, {
  mode: 'development'
})

module.exports = webpackConfig
