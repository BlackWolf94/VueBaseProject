import {VueLoaderPlugin} from 'vue-loader';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import {TsconfigPathsPlugin} from 'tsconfig-paths-webpack-plugin';
import {makeConf, tsconfig} from '../untils/env';
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';
// @ts-ignore
import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin';
import chalk from 'chalk';
// @ts-ignore
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import {DefinePlugin} from 'webpack';
import VueSSRClientPlugin from 'vue-server-renderer/client-plugin';
import VueSSRServerPlugin from 'vue-server-renderer/server-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const defaultPlugins = [
    new VueLoaderPlugin(),
    // new MiniCssExtractPlugin({
    //     // Options similar to the same options in webpackOptions.output
    //     // both options are optional
    //     filename: !isProd ? '[name].css' : '[name].[hash].css',
    //     chunkFilename: !isProd ? '[id].css' : '[id].[hash].css',
    // }),
    new FriendlyErrorsPlugin(),
    new ForkTsCheckerWebpackPlugin({tsconfig, vue: true}),
    new TsconfigPathsPlugin({configFile: tsconfig}),
];

export const loadPlugins = (VUE_ENV: string, stringify: boolean = true) => {
    // const plugins = isProd ? [
    //     ...defaultPlugins,
    //
    // ] : [
    //     ...defaultPlugins,
    //     new MiniCssExtractPlugin({
    //         // Options similar to the same options in webpackOptions.output
    //         // both options are optional
    //         filename: !isProd ? '[name].css' : '[name].[hash].css',
    //         chunkFilename: !isProd ? '[id].css' : '[id].[hash].css',
    //     }),
    // ];


    return [...defaultPlugins,
        new VuetifyLoaderPlugin(),
        new DefinePlugin({
            'process.env': makeConf({VUE_ENV}, stringify),
        }),
        VUE_ENV === 'client' ? new VueSSRClientPlugin() : new VueSSRServerPlugin(),
        new ProgressBarPlugin({
            format: `Build ${VUE_ENV} [:bar] ` + chalk.green.bold(':percent') + ' (:elapsed seconds)',
        })
    ];
};
