const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base.config');
const SWPrecachePlugin = require('sw-precache-webpack-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const config = merge(base, {
    entry: {
        app: './src/entry-client.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].[contenthash:8].js',
        publicPath: '/',
        chunkFilename: 'js/[name].[contenthash:8].js'
    },
    plugins: [
        // strip dev-only code in Vue source
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"client"'
        }),
        new VueSSRClientPlugin()
    ],
    // optimization: {
    //     runtimeChunk: {
    //         name: 'rtm'
    //     },
    //     splitChunks: {
    //         chunks: 'all'
    //     }
    // },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    name: 'chunk-vendors',
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    chunks: 'initial'
                },
                common: {
                    name: 'chunk-common',
                    minChunks: 2,
                    priority: -20,
                    chunks: 'initial',
                    reuseExistingChunk: true
                }
            }
        },
        minimizer: [
            /* config.optimization.minimizer('terser') */
            new TerserPlugin(
                {
                    terserOptions: {
                        compress: {
                            arrows: false,
                            collapse_vars: false,
                            comparisons: false,
                            computed_props: false,
                            hoist_funs: false,
                            hoist_props: false,
                            hoist_vars: false,
                            inline: false,
                            loops: false,
                            negate_iife: false,
                            properties: false,
                            reduce_funcs: false,
                            reduce_vars: false,
                            switches: false,
                            toplevel: false,
                            typeofs: false,
                            booleans: true,
                            if_return: true,
                            sequences: true,
                            unused: true,
                            conditionals: true,
                            dead_code: true,
                            evaluate: true
                        },
                        mangle: {
                            safari10: true
                        }
                    },
                    sourceMap: true,
                    cache: true,
                    parallel: true,
                    extractComments: false
                }
            )
        ]
    },

});

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
        // auto generate service worker
        new SWPrecachePlugin({
            cacheId: 'vue-hn',
            filename: 'service-worker.js',
            minify: true,
            dontCacheBustUrlsMatching: /./,
            staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/],
            runtimeCaching: [
                // {
                //     urlPattern: '/',
                //     handler: 'networkFirst'
                // },
                // {
                //     urlPattern: /\/(top|new|show|ask|jobs)/,
                //     handler: 'networkFirst'
                // },
                // {
                //     urlPattern: '/item/:id',
                //     handler: 'networkFirst'
                // },
                // {
                //     urlPattern: '/user/:id',
                //     handler: 'networkFirst'
                // }
            ]
        })
    )
}

module.exports = config;
