const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { mergeWithRules } = require('webpack-merge')
const base = require('./webpack.base.config')

const mergeRules = {
  module: {
    rules: {
      test: 'match',
      use: 'replace'
    }
  }
}

/** @type {import('webpack').Configuration} */
const webpackConfig = mergeWithRules(mergeRules)(base, {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css'
    })
  ]
})

module.exports = webpackConfig
