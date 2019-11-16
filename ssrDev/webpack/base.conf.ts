import {Configuration} from 'webpack';
import {_rules} from './_rules';
import {isProd, outDir, pathResolve, publicDir, rootDir, srcDir, tsconfig} from '../untils/env';
import {TsconfigPathsPlugin} from 'tsconfig-paths-webpack-plugin';

export const WpBase = {
    devtool: isProd ? false : '#cheap-module-source-map',
    mode: isProd ? 'production' : 'development',
    context: rootDir,
    output: {
        path: outDir('./dist'),
        publicPath: '/dist/',
        filename: 'js/[name].[chunkhash].js',
    },
    resolve: {
        alias: {
            '@web': srcDir,
            'vue$': 'vue/dist/vue.runtime.esm.js',
            // 'vuetify': 'vuetify/src',
        },
        extensions: ['.ts', '.tsx', '.js', '.vue', '.json', '.wasm'],
        modules: [
            'node_modules',
            pathResolve('/node_modules'),
            pathResolve('/node_modules/@vue/cli-service/node_modules'),
        ],
        plugins: [
            new TsconfigPathsPlugin({configFile: tsconfig}),
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
        noParse: /^(vue|vue-router|vuex|vuex-router-sync|axios)$/,
        // noParse: /es6-promise\.js$/, // avoid webpack shimming process
        rules: _rules.map((rule: any) => rule.conf),
    },
    performance: {
        maxEntrypointSize: 300000,
        hints: isProd ? 'warning' : false,
    },
    parallelism: 2,

} as Configuration;

