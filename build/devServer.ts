import fs from 'fs';
import path from 'path';
import {WpClient} from './webpack/client.conf';
import chokidar from 'chokidar';
import webpack, {HotModuleReplacementPlugin} from 'webpack';
import {WpServe} from './webpack/server.conf';
import MFS from 'memory-fs';

const readFile = (_fs: any, file: string) => {
    try {
        return _fs.readFileSync(path.join(WpClient.output.path, file), 'utf-8');
    } catch (e) {
    }
};

export const devServer = (app: any, templatePath: string, cb: (...props: any) => void) => {
    let bundle: any;
    let template: any;
    let clientManifest: any;

    let ready: () => void;

    const readyPromise = new Promise((r) => {
        ready = r;
    });
    const update = () => {
        if (bundle && clientManifest) {
            ready();
            cb(bundle, {
                template,
                clientManifest,
            });
        }
    };

    // read template from disk and watch
    template = fs.readFileSync(templatePath, 'utf-8');
    chokidar.watch(templatePath).on('change', () => {
        template = fs.readFileSync(templatePath, 'utf-8');
        console.log('index.html template updated.');
        update();
    });

    // modify client config to work with hot middleware
    (WpClient.entry as any).app = ['webpack-hot-middleware/client', (WpClient.entry as any)];
    WpClient.output.filename = '[name].js';
    WpClient.plugins.push(
        new HotModuleReplacementPlugin(),
    );
    WpClient.optimization.noEmitOnErrors = true;


    // dev middleware
    const clientCompiler = webpack(WpClient);
    const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
        publicPath: WpClient.output.publicPath,
        noInfo: true,
    });

    app.use(devMiddleware);

    clientCompiler.plugin('done', (stats) => {
        stats = stats.toJson();
        stats.errors.forEach(console.error);
        stats.warnings.forEach(console.warn);

        if (stats.errors.length) {
            return;
        }

        clientManifest = JSON.parse(readFile(
            devMiddleware.fileSystem,
            'vue-ssr-client-manifest.json',
        ));
        update();
    });


    // hot middleware
    app.use(require('webpack-hot-middleware')(clientCompiler, { heartbeat: 5000 }));

    // watch and update server renderer
    const serverCompiler = webpack(WpServe);
    const mfs = new MFS();
    serverCompiler.outputFileSystem = mfs;
    serverCompiler.watch({}, (err, stats: any) => {
        if (err) { throw err; }
        stats = stats.toJson();
        if (stats.errors.length) { return; }

        // read bundle generated by vue-ssr-webpack-plugin
        bundle = JSON.parse(readFile(mfs, 'vue-ssr-server-bundle.json'));
        update();
    });

    return readyPromise;
};
