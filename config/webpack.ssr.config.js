const { merge } = require('webpack-merge')
const base = require('./webpack.base.config')

/** @type {import('webpack').Configuration} */
const webpackConfig = merge(base, {
  experiments: {
    outputModule: true
  },
  output: {
    library: {
      type: 'module'
    },
    filename: 'ssr.index.js'
  }
})

delete webpackConfig.output.library.name // Library name must be unset when exporting as a module

module.exports = webpackConfig
