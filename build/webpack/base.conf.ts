import * as path from 'path';
import envLoader from '../envLoader';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';
import {Configuration} from 'webpack';
import {createLoader, createRule} from '../untils';
import vueConfig from '../vueLoader';
import styleLoader from '../styleLoader';
import TerserPlugin from 'terser-webpack-plugin';
import {VueLoaderPlugin} from 'vue-loader';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import {styleLoaderConf} from './style.conf';
// @ts-ignore
// import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin';

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
    // new VuetifyLoaderPlugin(),

];


const moduleRules = [
    createRule(/\.vue$/, 'vue-loader', vueConfig),
    createRule(/\.js$/, 'babel-loader').exclude(/node_modules/),
    createRule(/\.(png|jpg|gif|svg)$/, 'url-loader', {
        limit: 10000,
        name: '[name].[ext]?[hash]',
    }),
    createRule(/\.(svg)(\?.*)?$/, 'file-loader', {
        name: 'img/[name].[hash:8].[ext]',
    }),
    createRule(/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, 'file-loader', {
        name: 'media/[name].[hash:8].[ext]',
    }),
    createRule(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i, 'file-loader', {
        name: 'fonts/[name].[hash:8].[ext]',
    }),
    ...styleLoaderConf,
    // createRule(/\.css$/).use(styleLoader.getLoaders('css', isProd, isProd)),
    // createRule(/\.scss$/).use(styleLoader.getLoaders('scss', isProd, isProd)),
    // createRule(/\.s[ac]ss$/).use(styleLoader.getLoaders('sass', isProd, isProd)),
    createRule(/\.pug$/, 'pug-plain-loader'),
    createRule(/\.ts$/).use([
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

];


export const WpBase = {
    devtool: isProd ? false : '#cheap-module-source-map',
    mode: isProd ? 'production' : 'development',
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: '[name].[chunkhash].js',
    },
    resolve: {
        alias: {
            // 'public': path.resolve(__dirname, '../../public'),
            // 'assets': path.resolve(__dirname, '../../src/assets'),
            '@': path.resolve(__dirname, '../../src'),
            vue$: 'vue/dist/vue.runtime.esm.js',
        },
        extensions: ['.ts', '.tsx', '.js', '.vue', '.json', '.wasm'],
    },
    module: {
        noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
        // noParse: /es6-promise\.js$/, // avoid webpack shimming process
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

