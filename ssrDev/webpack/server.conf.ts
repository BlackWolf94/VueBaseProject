import {WpBase} from './base.conf';
import nodeExternals from 'webpack-node-externals';
import {loadPlugins} from './_plugins';
import {Configuration} from 'webpack';
import {makeEntry} from '../untils/env';


// ****************************************
// Server-Side Webpack Configuration
// ****************************************


export const WpServe = {
    ...WpBase,
    target: 'node',
    devtool: '#source-map',
    entry: makeEntry('server'),
    output: {
        // path: WpBase.output.path,
        libraryTarget: 'commonjs2',
    },
    // externals: nodeExternals({
    //     whitelist: ['vue', 'vue-router', 'vuex', /\.css$/, /axios/, /vuetify\/lib/ ],
    //     // modulesFromFile: true,
    //     // do not externalize CSS files in case we need to import it from a dep
    // }),
    plugins: loadPlugins('server'),
} as Configuration;

export default WpServe;
