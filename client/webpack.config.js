const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: './src/index.jsx',
    output: {
      filename: 'app.bundle.js',
      path: __dirname + '/build',
      publicPath: '/'
    },
    devServer: {
      contentBase: './build'
    },
    devtool: 'eval-source-map',
    mode: 'development',
    module: {
      rules: [{
            test: /\.css$/,
            use: [ MiniCssExtractPlugin.loader, 'css-loader' ],
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          }
        }
      ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            scriptLoading: 'defer',
            template: './public/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css',
        }),
    ],
    optimization: {
      minimizer: [ new UglifyJsPlugin() ],
    },
}
  