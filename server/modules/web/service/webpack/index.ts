import {Configuration} from 'webpack';
import {_rules} from './_rules';
import {TsconfigPathsPlugin} from 'tsconfig-paths-webpack-plugin';
import { SSRBuildConf } from './untils/SSRBuildConf';
import { loadPlugins } from './_plugins';
import AppHelper from '../../../../../common/helper/AppHelper';
import { optimization } from './_optimization';

export const WpBase = {
    devtool: AppHelper.isProd() ? false : '#inline-source-map',
    mode: AppHelper.isProd() ? 'production' : 'development',
    context: AppHelper.pathResolve(),
    output: {
        path: SSRBuildConf.outDir,
        publicPath: '/dist/',
        filename: 'js/[name].[chunkhash].js',
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
        rules: _rules.map((rule: any) => rule.conf),
    },
    performance: {
        maxEntrypointSize: 3000000,
        hints: AppHelper.isProd() ? 'warning' : false,
    },
    parallelism: 2,

} as Configuration;


// ****************************************
// Server-Side Webpack Configuration
// ****************************************


export const WpServe = {
    ...WpBase,
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
    plugins: loadPlugins('server'),
} as Configuration;

// ****************************************
// Client-Side Webpack Configuration
// ****************************************


export const WpClient = {
    ...WpBase,
    entry: {
        app: SSRBuildConf.entry('client'),
    },
    target: 'web',
    plugins: loadPlugins('client'),
    optimization,

} as Configuration;
