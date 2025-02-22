'use strict';

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const dotenv = require('dotenv');

module.exports = () => {
    const env = dotenv.config().parsed;

    const envKeys = Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next]);
        return prev;
    }, {});

    return {
        entry: {
            main: path.resolve(__dirname, 'livechat/index.js'),
            vendor: ['react', 'react-dom']
        },
        output: {
            path: path.join(__dirname, 'dist'),
            filename: 'bundle.js'
        },
        target: 'web',
        mode: 'development',
        devServer: {
            contentBase: path.resolve(__dirname, 'dist'),
            compress: false,
            host: '0.0.0.0',
            port: 3005,
            hot: true
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        },
        module: {
            rules: [
                {
                    test: /\.ts(x?)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader', 'ts-loader']
                },
                {
                    enforce: 'pre',
                    test: /\.js$/,
                    loader: 'source-map-loader'
                },
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.scss$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'style-loader',
                            options: { hmr: true }
                        },
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                plugins: () => [
                                    require('postcss-flexbugs-fixes'), // eslint-disable-line
                                    autoprefixer({
                                        browsers: [
                                            '>1%',
                                            'last 4 versions',
                                            'Firefox ESR',
                                            'not ie <9'
                                        ],
                                        flexbox: 'no-2009'
                                    })
                                ]
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                includePaths: [
                                    path.resolve(__dirname, 'src/scss')
                                ]
                            }
                        }
                    ]
                },
                {
                    test: /\.(jpg|png|gif|svg)$/,
                    use: 'url-loader'
                }
            ]
        },
        devtool: 'inline-source-map',
        plugins: [
            new CleanWebpackPlugin(['dist']),
            new webpack.HotModuleReplacementPlugin(),
            new HtmlWebpackPlugin({
                template: './livechat/index.html'
            }),
            new webpack.ProvidePlugin({
                React: 'react'
            }),
            new webpack.DefinePlugin(envKeys)
        ],
        performance: {
            hints: false
        }
    };
};
