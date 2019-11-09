const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    devtool: isProd
        ? false
        : '#cheap-module-source-map',
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: '[name].[chunkhash].js'
    },
    resolve: {
        alias: {
            'public': path.resolve(__dirname, '../public'),
            '@': path.resolve(__dirname, '../src'),
            vue$: 'vue/dist/vue.runtime.esm.js'
        },
        extensions: [
            '.ts',
            '.js',
            '.vue',
            '.json',
            '.wasm'
        ],
        modules: [
            'node_modules',
            path.resolve(__dirname, '../node_modules',),
            path.resolve(__dirname, '../node_modules/@vue/cli-service/node_modules',),
        ]
    },
    resolveLoader: {
        modules: [
            path.resolve(__dirname, '../node_modules/@vue/cli-plugin-typescript/node_modules',),
            path.resolve(__dirname, '../node_modules/@vue/cli-plugin-babel/node_modules',),
            'node_modules',
            path.resolve(__dirname, '../node_modules',),
            path.resolve(__dirname, '../node_modules/@vue/cli-service/node_modules',),
        ]
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    compilerOptions: {
                        preserveWhitespace: false
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.styl(us)?$/,
                use: isProd
                    ? ExtractTextPlugin.extract({
                        use: [
                            {
                                loader: 'css-loader',
                                options: {minimize: true}
                            },
                            'stylus-loader'
                        ],
                        fallback: 'vue-style-loader'
                    })
                    : ['vue-style-loader', 'css-loader', 'stylus-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            // {
            //     test: /\.pug$/,
            //     loader: 'pug-plain-loader'
            // },
            // {
            //     test: /\.pug$/,
            //     oneOf: [
            //         // this applies to <template lang="pug"> in Vue components
            //         {
            //             resourceQuery: /^\?vue/,
            //             loader: 'pug-plain-loader',
            //             options: options.pug
            //         },
            //         // this applies to pug imports inside JavaScript
            //         {
            //             use: ['raw-loader', {
            //                 loader: 'pug-plain-loader',
            //                 options: options.pug
            //             }]
            //         }
            //     ]
            // },
            {
                test: /\.pug$/,
                oneOf: [
                    /* config.module.rule('pug').oneOf('vue-loader') */
                    {
                        resourceQuery: /^\?vue/,
                        use: [
                            /* config.module.rule('pug').oneOf('vue-loader').use('pug-plain') */
                            {
                                loader: 'pug-plain-loader'
                            }
                        ]
                    },
                    /* config.module.rule('pug').oneOf('raw-pug-files') */
                    {
                        use: [
                            /* config.module.rule('pug').oneOf('raw-pug-files').use('pug-raw') */
                            {
                                loader: 'raw-loader'
                            },
                            /* config.module.rule('pug').oneOf('raw-pug-files').use('pug-plain') */
                            {
                                loader: 'pug-plain-loader'
                            }
                        ]
                    }
                ]
            },
            {
                test: /\.ts$/,
                use: [
                    /* config.module.rule('ts').use('cache-loader') */
                    {
                        loader: 'cache-loader',
                        options: {

                            cacheDirectory: path.resolve(__dirname, '../node_modules/.cache/ts-loader'),
                            cacheIdentifier: '5c0e891f'
                        }
                    },
                    /* config.module.rule('ts').use('thread-loader') */
                    {
                        loader: 'thread-loader'
                    },
                    /* config.module.rule('ts').use('babel-loader') */
                    {
                        loader: 'babel-loader'
                    },
                    /* config.module.rule('ts').use('ts-loader') */
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            appendTsSuffixTo: [
                                '\\.vue$'
                            ],
                            happyPackMode: true
                        }
                    }
                ]
            },
        ]
    },
    performance: {
        hints: false
    },
    plugins: isProd
        ? [
            new VueLoaderPlugin(),
            // new webpack.optimize.UglifyJsPlugin({
            //     compress: {warnings: false}
            // }),
            // new webpack.optimize.ModuleConcatenationPlugin(),
            // new ExtractTextPlugin({
            //     filename: 'common.[chunkhash].css'
            // })
        ]
        : [
            new VueLoaderPlugin(),
            new FriendlyErrorsPlugin()
        ]
};
