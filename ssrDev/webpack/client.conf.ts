import {WpBase} from './base.conf';
import {Configuration} from 'webpack';
import {loadPlugins} from './_plugins';
import {isProd, makeEntry} from '../untils/env';
import TerserPlugin from 'terser-webpack-plugin';

export const WpClient = {
    ...WpBase,
    entry: {
        app: makeEntry('client'),
    },
    target: 'web',
    plugins: loadPlugins('client'),
    optimization: {
        minimize: isProd,
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
                            evaluate: true,
                        },
                        mangle: {
                            safari10: true,
                        },
                    },
                    sourceMap: true,
                    cache: true,
                    parallel: true,
                    extractComments: false,
                },
            ),
        ],
    },

} as Configuration;

export default WpClient;
