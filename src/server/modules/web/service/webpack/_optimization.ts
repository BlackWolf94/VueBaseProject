import * as webpack from 'webpack';
import Optimization = webpack.Options.Optimization;
import TerserPlugin from 'terser-webpack-plugin';
import AppHelper from '../../../../../../common/helper/AppHelper';

/**
 * @author Dmytro Zataidukh
 * @created_at 12/8/19
 */

export const optimization: Optimization =   {
  minimize: AppHelper.isProd(),
  removeAvailableModules: false,
  removeEmptyChunks: false,
  // mergeDuplicateChunks: true,
  // flagIncludedChunks: true,
  // runtimeChunk: true,
  // namedChunks: AppHelper.isDev(),
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
  minimizer:  AppHelper.isProd() ? [
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
  ] : [],
};
