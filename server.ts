import express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import LRU from 'lru-cache';
import {createBundleRenderer} from 'vue-server-renderer';
import vhost from 'vhost-ts';
import compression from 'compression';
import {devServer} from './build/devServer';
import {buildConf, isProd, outDir, publicDir} from './build/untils/env';

const serverInfo =
    `express/${require('express/package.json').version} ` +
    `vue-server-renderer/${require('vue-server-renderer/package.json').version}`;

const resolve = (file: string) => path.resolve(__dirname, file);

const app = express();


function createRenderer(bundle: any, options: any) {
    // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
    return createBundleRenderer(bundle, Object.assign(options, {
        // for component caching
        cache: new LRU({
            max: 1000,
            maxAge: 1000 * 60 * 15,
        }),
        // this is only needed when vue-server-renderer is npm-linked
        basedir: resolve('./dist'),
        // recommended for performance
        runInNewContext: false,
    }));
}


let renderer: any;
let readyPromise: any;
const templatePath = resolve('./public/index.ssr.html');

if (isProd) {
    // In production: create server renderer using template and built server bundle.
    // The server bundle is generated by vue-ssr-webpack-plugin.
    const template = fs.readFileSync(templatePath, 'utf-8');
    const bundle = require('./dist/vue-ssr-server-bundle.json');
    // The client manifests are optional, but it allows the renderer
    // to automatically infer preload/prefetch links and directly add <script>
    // tags for any async chunks used during render, avoiding waterfall requests.
    const clientManifest = require('./dist/vue-ssr-client-manifest.json');
    renderer = createRenderer(bundle, {
        template,
        clientManifest,
    });
} else {
    // In development: setup the dev server with watch and hot-reload,
    // and create a new renderer on bundle / index template update.
    readyPromise = devServer(
        app,
        templatePath,
        (bundle: any, options: any) => {
            renderer = createRenderer(bundle, options);
        },
    );
}

const serve = (path: string, cache: any) => express.static(resolve(path), {
    maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0,
});

app.use(compression({threshold: 0}));
app.use('/dist', serve('./dist', true));
app.use('/public', serve('./public', true));

function render(req: any, res: any) {
    const s = Date.now();

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Server', serverInfo);

    const handleError = (err: any) => {
        if (err.url) {
            res.redirect(err.url);
        } else if (err.code === 404) {
            res.status(404).send('404 | Page Not Found');
        } else {
            // Render Error Page or Redirect
            res.status(500).send('500 | Internal Server Error');
            console.error(`error during render : ${req.url}`);
            console.error(err.stack);
        }
    };

    const context = {
        title: (buildConf as any).TITLE, // default title
        url: req.url,
    };
    renderer.renderToString(context, (err: any, html: string) => {
        if (err) {
            console.error(err);
            return handleError(err);
        }
        res.send(html);
        if (!isProd) {
            console.log(`whole request: ${Date.now() - s}ms`);
        }
    });
}

const host = (buildConf as any).HOST || 'localhost';
const port = (buildConf as any).PORT || 3000;

app.use(vhost(host, express.static('/')));

app.get('*', isProd ? render : (req, res) => {
    readyPromise.then(() => render(req, res));
});

app.listen(port, () => {
    console.log(`server started at ${host}:${port}`);
});
