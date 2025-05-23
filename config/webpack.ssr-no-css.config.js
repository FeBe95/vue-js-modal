const { merge } = require('webpack-merge')
const baseNoCss = require('./webpack.base-no-css.config')

/** @type {import('webpack').Configuration} */
const webpackConfig = merge(baseNoCss, {
  experiments: {
    outputModule: true
  },
  output: {
    library: {
      type: 'module'
    },
    filename: 'ssr.nocss.js'
  }
})

delete webpackConfig.output.library.name // Library name must be unset when exporting as a module

module.exports = webpackConfig
