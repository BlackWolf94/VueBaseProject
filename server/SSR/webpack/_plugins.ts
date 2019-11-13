import {VueLoaderPlugin} from 'vue-loader';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import {TsconfigPathsPlugin} from 'tsconfig-paths-webpack-plugin';
import {isProd, makeConf, tsconfig} from './_env';
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
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
// @ts-ignore
import OptimizeCssnanoPlugin from '@intervolga/optimize-cssnano-plugin';
// @ts-ignore
import HashedModuleIdsPlugin from 'webpack-hashed-module-id-plugin';

const defaultPlugins = [
    new VueLoaderPlugin(),
    new CaseSensitivePathsPlugin(),
    new FriendlyErrorsPlugin(),
    new ForkTsCheckerWebpackPlugin({tsconfig, vue: true}),
    new TsconfigPathsPlugin({configFile: tsconfig}),
];

const prodPlugin = [
    new OptimizeCssnanoPlugin(
        {
            sourceMap: false,
            cssnanoOptions: {
                preset: [
                    'default',
                    {
                        mergeLonghand: false,
                        cssDeclarationSorter: false,
                    },
                ],
            },
        },
    ),
    /* config.plugin('hash-module-ids') */
    new HashedModuleIdsPlugin(
        {
            hashDigest: 'hex',
        },
    ),
    /* config.plugin('named-chunks') */
    new NamedChunksPlugin(),
    // new HtmlPwaPlugin({
    //         name: buildConf.APP_NAME,
    //     },
    // ),
];


export const loadPlugins = (VUE_ENV: string, stringify: boolean = true) => {
    return [...defaultPlugins,
        new VuetifyLoaderPlugin(),
        new DefinePlugin({
            'process.env': makeConf({VUE_ENV}, stringify),
        }),
        ...(VUE_ENV === 'client' ? [
            new VueSSRClientPlugin(),
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: !isProd ? '[name].css' : '[name].[hash].css',
                chunkFilename: !isProd ? '[id].css' : '[id].[hash].css',
            }),
            ...prodPlugin,
            /* config.plugin('preload') */
            // new PreloadPlugin(
            //     {
            //         rel: 'preload',
            //         include: 'initial',
            //         fileBlacklist: [
            //             /\.map$/,
            //             /hot-update\.js$/,
            //         ],
            //     },
            // ),
            // /* config.plugin('prefetch') */
            // new PreloadPlugin(
            //     {
            //         rel: 'prefetch',
            //         include: 'asyncChunks',
            //     },
            // ),
        ] : [
            new VueSSRServerPlugin(),

        ]),
        new ProgressBarPlugin({
            format: `Build ${VUE_ENV} [:bar] ` + chalk.green.bold(':percent') + ' (:elapsed seconds)',
        }),
    ];
};
