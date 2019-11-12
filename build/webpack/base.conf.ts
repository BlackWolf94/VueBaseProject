import {Configuration} from 'webpack';
import {rules} from './rules';
import {isProd, outDir, pathResolve, srcDir} from '../untils/env';
import TerserPlugin from 'terser-webpack-plugin';

export const WpBase = {
    devtool: isProd ? false : '#cheap-module-source-map',
    mode: isProd ? 'production' : 'development',
    output: {
        path: outDir,
        publicPath: '/dist/',
        filename: '[name].[chunkhash].js',
    },
    resolve: {
        alias: {
            '@': srcDir,
            'vue$': 'vue/dist/vue.runtime.esm.js',
        },
        extensions: ['.ts', '.tsx', '.js', '.vue', '.json', '.wasm'],
        modules: [
            'node_modules',
            pathResolve('/node_modules'),
            pathResolve('/node_modules/@vue/cli-service/node_modules'),
        ],
    },
    resolveLoader: {
        modules: [
            pathResolve('/node_modules/@vue/cli-plugin-typescript/node_modules'),
            pathResolve('/node_modules/@vue/cli-plugin-babel/node_modules'),
            'node_modules',
            pathResolve('/node_modules'),
            pathResolve('/node_modules/@vue/cli-service/node_modules'),
        ],
    },
    module: {
        noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
        // noParse: /es6-promise\.js$/, // avoid webpack shimming process
        rules: rules.map((rule) => rule.conf),
    },
    performance: {
        maxEntrypointSize: 300000,
        hints: isProd ? 'warning' : false,
    },
    parallelism: 2,

} as Configuration;

