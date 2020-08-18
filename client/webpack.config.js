const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimiseCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: 'app.bundle.js',
        path: path.resolve('../server/src/dist'),
        publicPath: '/',
    },
    devServer: {
        hot: true,
        compress: true,
        contentBase: './build',
        port: 3000,
        historyApiFallback: true,
        proxy: [{
            context: [ '/api', '/auth', '/socket' ],
            target: 'http://localhost:5000',
            ws: true,
        }],
    },
    devtool: 'eval-source-map',
    mode: 'development',
    module: {
        rules: [{
            test: /\.css$/,
            use: [ MiniCssExtractPlugin.loader, 'css-loader', {
                loader: 'postcss-loader',
                options: {
                    ident: 'postcss',
                    plugins: [
                        require('tailwindcss'),
                        require('autoprefixer'),
                    ],
                },
            }],
        },
        {
            test: /\.(js|jsx|ts|tsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        'minify',
                        '@babel/preset-env',
                        '@babel/preset-react',
                        '@babel/preset-typescript',
                    ],
                },
            },
        },
        {
            test: /\.(?:png|jpe?g|gif|svg|ico)$/,
            loader: 'file-loader',
            options: {
                name: 'media/[name].[ext]',
            },
        },
        ],
    },
    resolve: {
        extensions: [ '.js', '.jsx', '.ts', '.tsx' ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            scriptLoading: 'defer',
            template: './public/index.html',
            favicon: './src/media/favicon.ico',
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css',
        }),
    ],
    optimization: {
        minimizer: [ new OptimiseCssAssetsPlugin() ],
    },
};
