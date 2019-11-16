import {VueLoaderPlugin} from 'vue-loader';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import {TsconfigPathsPlugin} from 'tsconfig-paths-webpack-plugin';
import {isProd, makeConf, tsconfig} from '../untils/env';
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';
// @ts-ignore
import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin';
import chalk from 'chalk';
// @ts-ignore
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import {DefinePlugin, NamedChunksPlugin} from 'webpack';
import VueSSRClientPlugin from 'vue-server-renderer/client-plugin';
import VueSSRServerPlugin from 'vue-server-renderer/server-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
// @ts-ignore
import OptimizeCssnanoPlugin from '@intervolga/optimize-cssnano-plugin';
// @ts-ignore
import HashedModuleIdsPlugin from 'webpack-hashed-module-id-plugin';


export const loadPlugins = (VUE_ENV: string, stringify: boolean = true) => {
    const plugins: any[] = [];

    if (isProd) {
        plugins.push(new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css',
        }));
    }

    plugins.push(...[
        new VueLoaderPlugin(),
        new FriendlyErrorsPlugin(),
        new ForkTsCheckerWebpackPlugin({tsconfig, vue: true}),
        new VuetifyLoaderPlugin(),
        new DefinePlugin({
            'process.env': makeConf({VUE_ENV}, stringify),
        }),
        new ProgressBarPlugin({
            format: `Build ${VUE_ENV} [:bar] ` + chalk.green.bold(':percent') + ' (:elapsed seconds)',
        }),
    ]);

    if (isProd) {
        plugins.push(...[
            new OptimizeCssnanoPlugin({sourceMap: false}),
            new HashedModuleIdsPlugin({hashDigest: 'hex'}),
            new NamedChunksPlugin(),
        ]);
    }

    plugins.push(VUE_ENV === 'client' ? new VueSSRClientPlugin() : new VueSSRServerPlugin());
    return plugins;
};
