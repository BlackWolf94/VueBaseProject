import * as path from 'path';
import envLoader from '../envLoader';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';
import {Configuration} from 'webpack';
import {VueLoaderPlugin} from 'vue-loader';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import {moduleRules} from './moduleRules';
// @ts-ignore
import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin';
import {TsconfigPathsPlugin} from 'tsconfig-paths-webpack-plugin';

const config = envLoader({
    stringify: false,
});

const isProd = config.NODE_ENV === 'production';

const plugins = [
    new VueLoaderPlugin(),
    new ForkTsCheckerWebpackPlugin({tsconfig: path.resolve(__dirname, '../../tsconfig.json'), vue: true}),
    new TsconfigPathsPlugin({configFile: path.resolve(__dirname, '../../tsconfig.json')}),
    ...(isProd ? [new FriendlyErrorsPlugin()] : [
        new ExtractTextPlugin({
            filename: 'common.[chunkhash].css',
        }),
    ]),
    new VuetifyLoaderPlugin(),
];


export const WpBase = {
    devtool: isProd ? false : '#cheap-module-source-map',
    mode: isProd ? 'production' : 'development',
    output: {
        path: path.resolve(__dirname, '../../dist'),
        publicPath: '/dist/',
        filename: '[name].[chunkhash].js',
    },
    resolve: {
        alias: {
            // 'public': path.resolve(__dirname, '../../public'),
            // 'assets': path.resolve(__dirname, '../../src/assets'),
            '@': path.resolve(__dirname, '../../src'),
            'vue$': 'vue/dist/vue.runtime.esm.js',
        },
        extensions: ['.ts', '.tsx', '.js', '.vue', '.json', '.wasm'],
    },
    module: {
        // noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
        noParse: /es6-promise\.js$/, // avoid webpack shimming process
        rules: moduleRules.map((rule) => rule.conf),
    },
    performance: {
        maxEntrypointSize: 300000,
        hints: isProd ? 'warning' : false,
    },
    plugins,
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    name: 'chunk-vendors',
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    chunks: 'initial',
                },
                common: {
                    name: 'chunk-common',
                    minChunks: 2,
                    priority: -20,
                    chunks: 'initial',
                    reuseExistingChunk: true,
                },
            },
        },
    },


} as Configuration;

