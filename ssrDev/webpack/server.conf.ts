import {WpBase} from './base.conf';
import nodeExternals from 'webpack-node-externals';
import {loadPlugins} from './_plugins';
import {Configuration} from 'webpack';
import {makeEntry} from '../untils/env';


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
    //     // do not externalize CSS files in case we need to import it from a dep
    //     whitelist: /\.css$/,
    // }),
    plugins: loadPlugins('server'),
} as Configuration;

export default WpServe;
