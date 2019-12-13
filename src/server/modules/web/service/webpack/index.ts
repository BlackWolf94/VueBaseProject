import {Configuration} from 'webpack';
import {loadRules} from './_rules';
import {TsconfigPathsPlugin} from 'tsconfig-paths-webpack-plugin';
import { SSRBuildConf } from './untils/SSRBuildConf';
import { loadPlugins } from './_plugins';
import { optimization } from './_optimization';
import AppHelper from '../../../../../../common/helper/AppHelper';

const WpBase = (VUE_ENV: 'client' | 'server' ): Configuration => ({
    devtool: AppHelper.isProd() ? false : '#inline-source-map',
    mode: AppHelper.isProd() ? 'production' : 'development',
    context: AppHelper.pathResolve(),
    cache: !AppHelper.isProd(),
    output: {
        path: SSRBuildConf.outDir + '/',
        publicPath: SSRBuildConf.publicDir + '/',
        filename: AppHelper.isProd() ? 'js/[name].[chunkhash].js' : 'js/[name].js',
        sourceMapFilename: AppHelper.isProd() ? 'js/[name].[chunkhash].js.map' : 'js/[name].js.map',
    },
    resolve: {
        alias: {
            '@web': SSRBuildConf.srcDir,
            'vue$': 'vue/dist/vue.runtime.esm.js',
        },
        extensions: ['.ts', '.tsx', '.js', '.vue', '.json', '.wasm'],
        modules: [
            'node_modules',
            AppHelper.pathResolve('/node_modules'),
            AppHelper.pathResolve('/node_modules/@vue/cli-service/node_modules'),
        ],
        plugins: [
            new TsconfigPathsPlugin({configFile: SSRBuildConf.tsConfig}),
        ],
    },
    resolveLoader: {
        modules: [
            AppHelper.pathResolve('/node_modules/@vue/cli-plugin-typescript/node_modules'),
            AppHelper.pathResolve('/node_modules/@vue/cli-plugin-babel/node_modules'),
            'node_modules',
            AppHelper.pathResolve('/node_modules'),
            AppHelper.pathResolve('/node_modules/@vue/cli-service/node_modules'),
        ],
    },
    module: {
        noParse: /^(es6-promise\.js|vue|vue-router|vuex|vuex-router-sync|axios)$/,
        rules: loadRules(VUE_ENV === 'server'),
    },
    performance: {
        maxEntrypointSize: 3000000,
        hints: AppHelper.isProd() ? 'warning' : false,
    },
    parallelism: 2,
    plugins: loadPlugins(VUE_ENV),

});


// ****************************************
// Server-Side Webpack Configuration
// ****************************************
export const WpServe: Configuration  = {
    ...WpBase('server'),
    target: 'node',
    devtool: '#source-map',
    entry: SSRBuildConf.entry('server'),
    output: {
        // path: WpBase.output.path,
        libraryTarget: 'commonjs2',
    },
    // externals: nodeExternals({
    //     whitelist: ['vue', 'vue-router', 'vuex', /\.css$/, /axios/ ],
    //     // modulesFromFile: true,
    //     // do not externalize CSS files in case we need to import it from a dep
    // }),
};


// ****************************************
// Client-Side Webpack Configuration
// ****************************************
export const WpClient: Configuration = {
    ...WpBase('client'),
    entry: {
        app: SSRBuildConf.entry('client'),
    },
    target: 'web',
    optimization,
};
