const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  context: path.join(__dirname, 'src'),
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [{
        from: 'assets/',
        to:'assets/'
      }]
    }),
    new HtmlWebpackPlugin({
      title: 'saimukzi.bg',
    }),
  ],
  mode: 'development',
  entry: {
    main: './js/main.js',
  },
  output: {
    filename: 'cp-[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devtool: 'source-map',
  devServer: {
    compress: true,
    allowedHosts: ['.gitpod.io']
  }
};
