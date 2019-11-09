import {Configuration, DefinePlugin} from 'webpack';
import {WpBase} from './base.conf';
import nodeExternals from 'webpack-node-externals';
import VueSSRClientPlugin from 'vue-server-renderer/client-plugin';
import envLoader from '../envLoader';
import WpClient from "./client.conf";

const config = envLoader({
    customConfig: {
        VUE_ENV: 'server',
    },
});

export const WpServe: Configuration = {
    ...WpBase,
    target: 'node',
    devtool: '#source-map',
    entry: './src/entry-server.js',
    output: {
        filename: 'server-bundle.js',
        libraryTarget: 'commonjs2',
    },
    externals: nodeExternals({
        // do not externalize CSS files in case we need to import it from a dep
        whitelist: /\.css$/,
    }),
    plugins: [
        ...WpBase.plugins,
        new DefinePlugin({
            'process.env': config,
        }),
        new VueSSRClientPlugin(),

    ],
};

export default WpServe
