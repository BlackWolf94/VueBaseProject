import path from 'path';
import envLoader from './envLoader';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import {Configuration} from 'webpack';
import {createLoader, createRule} from './untils';
import vueConfig from './vueLoader.config';
import styleLoader from './styleLoader';
import TerserPlugin from 'terser-webpack-plugin';
import {VueLoaderPlugin} from 'vue-loader';

const config = envLoader({
    stringify: false,
});

const isProd = config.NODE_ENV === 'production';

const plugins = [
    // new VueLoaderPlugin(),
    new ForkTsCheckerWebpackPlugin({tsconfig: path.resolve(__dirname, '../tsconfig.json'), vue: true}),
    new TsconfigPathsPlugin({configFile: path.resolve(__dirname, '../tsconfig.json')}),
    ...(isProd ? [new FriendlyErrorsPlugin()] : [
        new ExtractTextPlugin({
            filename: 'common.[chunkhash].css',
        }),
    ]),
];

export const WpBase = {
    devtool: isProd ? false : '#cheap-module-source-map',
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: '[name].[chunkhash].js',
    },
    resolve: {
        alias: {
            'public': path.resolve(__dirname, '../public'),
            'assets': path.resolve(__dirname, '../src/assets'),
            '@': path.resolve(__dirname, '../src'),
        },
        extensions: ['.ts', '.tsx', '.js', '.vue', '.json', '.wasm'],
    },
    module: {
        noParse: /es6-promise\.js$/, // avoid webpack shimming process
        rules: [
            createRule(/\.vue$/, 'vue-loader', vueConfig),
            createRule(/\.js$/, 'babel-loader', {}).setExclude(/node_modules/),

            createRule(/\.(png|jpg|gif|svg)$/, 'url-loader', {
                limit: 10000,
                name: '[name].[ext]?[hash]',
            }),
            createRule(/\.css$/).setUse(styleLoader.getLoaders('css', isProd, isProd)),
            createRule(/\.scss$/).setUse(styleLoader.getLoaders('scss', isProd, isProd)),
            createRule(/\.ts$/).setUse([
                createLoader('cache-loader', {
                    cacheDirectory: path.resolve(__dirname, '../node_modules/.cache/ts-loader'),
                    cacheIdentifier: '5c0e891f',
                }),
                createLoader('thread-loader'),
                createLoader('babel-loader'),
                createLoader('ts-loader', {
                    transpileOnly: true,
                    appendTsSuffixTo: [
                        '\\.vue$',
                    ],
                    happyPackMode: true,
                }),
            ]),
            createRule(/\.pug$/, 'pug-plain-loader'),
            createRule(/\.tsx$/).setUse([
                createLoader('cache-loader', {
                    cacheDirectory: path.resolve(__dirname, '../node_modules/.cache/ts-loader'),
                    cacheIdentifier: '5c0e891f',
                }),
                createLoader('thread-loader'),
                createLoader('babel-loader'),
                createLoader('ts-loader', {
                    transpileOnly: true,
                    appendTsSuffixTo: [
                        '\\.vue$',
                    ],
                    happyPackMode: true,
                }),
            ]),
        ],
    },
    performance: {
        maxEntrypointSize: 300000,
        hints: isProd ? 'warning' : false,
    },
    plugins,
    // optimization: {
    //     splitChunks: {
    //         cacheGroups: {
    //             vendors: {
    //                 name: 'chunk-vendors',
    //                 test: /[\\/]node_modules[\\/]/,
    //                 priority: -10,
    //                 chunks: 'initial',
    //             },
    //             common: {
    //                 name: 'chunk-common',
    //                 minChunks: 2,
    //                 priority: -20,
    //                 chunks: 'initial',
    //                 reuseExistingChunk: true,
    //             },
    //         },
    //     },
    // },


} as Configuration;

