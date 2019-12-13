/**
 * @author Dmytro Zataidukh
 * @email zidadindimon@gmail.com
 * @created_at 05.12.19
 */
import { VueLoaderPlugin } from 'vue-loader';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';
// @ts-ignore
import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin';
import { DefinePlugin, EnvironmentPlugin, NamedChunksPlugin } from 'webpack';
import VueSSRClientPlugin from 'vue-server-renderer/client-plugin';
import VueSSRServerPlugin from 'vue-server-renderer/server-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
// @ts-ignore
import OptimizeCssnanoPlugin from '@intervolga/optimize-cssnano-plugin';
// @ts-ignore
import HashedModuleIdsPlugin from 'webpack-hashed-module-id-plugin';
// @ts-ignore
import ProgressPlugin from 'progress-webpack-plugin';
import { SSRBuildConf } from './untils/SSRBuildConf';
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';
import AppHelper from '../../../../../../common/helper/AppHelper';

// @ts-ignore
import ImageminPlugin from 'imagemin-webpack';

export const loadPlugins = (VUE_ENV: string) => {
  const plugins: any[] = [];

  if (AppHelper.isProd()) {
    plugins.push(...[
      new MiniCssExtractPlugin({
        filename: 'css/[name].[hash].css',
        chunkFilename: 'css/[id].[hash].css'
      }),
      // new ImageminPlugin({
      //   filter: (source: any) => source.byteLength > 8192,
      //   bail: false, // Ignore errors on corrupted images
      //   cache: true,
      //   imageminOptions: {
      //     plugins: [
      //       ['gifsicle', { interlaced: true }],
      //       ['jpegtran', { progressive: true }],
      //       ['optipng', { optimizationLevel: 5 }],
      //       [
      //         'svgo',
      //         {
      //           plugins: [
      //             {
      //               removeViewBox: false
      //             }
      //           ]
      //         }
      //       ]
      //     ]
      //   }
      // })
    ]);
  }

  plugins.push(...[
    new HardSourceWebpackPlugin(),
    new VueLoaderPlugin(),
    new FriendlyErrorsPlugin(),
    new ForkTsCheckerWebpackPlugin({
      tsconfig: SSRBuildConf.tsConfig,
      vue: true,
      tslint: true,
      ignoreLintWarnings: AppHelper.isDev(),
      formatter: 'codeframe',
      checkSyntacticErrors: false
    }),
    new VuetifyLoaderPlugin()
  ]);

  if (VUE_ENV === 'client') {
    plugins.push(
      new DefinePlugin(SSRBuildConf.stringify({ VUE_ENV, DEBUG: false })),
    );
  }

  if (AppHelper.isProd()) {
    plugins.push(...[
      new OptimizeCssnanoPlugin({ sourceMap: false }),
      new HashedModuleIdsPlugin({ hashDigest: 'hex' }),
      new NamedChunksPlugin()
    ]);
  }

  plugins.push(VUE_ENV === 'client' ? new VueSSRClientPlugin() : new VueSSRServerPlugin());

  plugins.push(new ProgressPlugin(true));
  return plugins;
};
