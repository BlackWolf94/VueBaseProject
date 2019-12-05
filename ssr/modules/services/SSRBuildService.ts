/**
 * @author Dmytro Zataidukh
 * @email zidadindimon@gmail.com
 * @created_at 05.12.19
 */

import { INestApplication, INestMicroservice, Injectable, Logger } from '@nestjs/common';
import { FileHelper } from '../../../common/helper/FileHelper';
import { SSRBuildConf } from './webpack/untils/SSRBuildConf';
import chokidar from 'chokidar';
import webpack, { HotModuleReplacementPlugin, Stats } from 'webpack';
import { WpClient, WpServe } from './webpack';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';

import { join } from 'path';
import MFS from 'memory-fs';

const readFile = (fs: any, file: string) => {
  try {
    return fs.readFileSync(join(WpClient.output.path, file), 'utf-8');
  } catch (e) {
    throw e;
  }
};

type TSSRDevServiceUpdate = (bundle: any, options: {template: any; clientManifest: any}) => void;

export class SSRBuildService {
  static devMiddleware: any;
  static hotMiddleware: any;

  static async build() {
    this.template = await FileHelper.readFile(SSRBuildConf.template);
    chokidar.watch(SSRBuildConf.template).on('change', this.onChangeTemplate.bind(this));

    // modify client config to work with hot middleware
    (WpClient.entry as any).app = ['webpack-hot-middleware/client', (WpClient.entry as any).app];
    WpClient.output.filename = 'js/[name].js';
    WpClient.plugins.push(
      new HotModuleReplacementPlugin()
    );
    WpClient.optimization.noEmitOnErrors = true;

    // dev middleware
    const clientCompiler = webpack(WpClient);

    this.devMiddleware = WebpackDevMiddleware(clientCompiler, {
      publicPath: WpClient.output.publicPath,
      serverSideRender: true,
      lazy: true
    });

    clientCompiler.hooks.done.tap('dev server', this.onDone.bind(this));

    this.hotMiddleware = WebpackHotMiddleware(clientCompiler, {heartbeat: 5000});
    const serverCompiler = webpack(WpServe);
    this.mfs = new MFS();
    serverCompiler.outputFileSystem = this.mfs;
    serverCompiler.watch({}, this.watch.bind(this));

    return new Promise((resolve) => {
      this.ready = resolve;
    });
  }

  static onReady(cb: TSSRDevServiceUpdate) {
    this.cb = cb;
    this.rebase();
  }

  private static template: string;
  private static bundle: any;
  private static clientManifest: any;
  private static mfs: MFS;
  private static ready: (value?: unknown) => void;
  private static cb: TSSRDevServiceUpdate;

  private static async onChangeTemplate() {
    this.template = await FileHelper.readFile(SSRBuildConf.template);
    Logger.debug(`Change: ${SSRBuildConf.template}`, 'SSRService');
    this.rebase();
  }

  private static onDone(stats: Stats) {
    stats.compilation.errors.forEach(console.error);
    stats.compilation.warnings.forEach(console.warn);
    if (stats.hasErrors()) {
      return;
    }
    this.clientManifest = JSON.parse(readFile(this.devMiddleware.fileSystem, 'vue-ssr-client-manifest.json'));
    this.rebase();
  }

  private static watch(err: Error, stats: Stats) {
    if (err) {
      throw err;
    }
    stats.compilation.errors.forEach(console.error);
    stats.compilation.warnings.forEach(console.warn);
    if (stats.hasErrors()) {
      return;
    }
    this.bundle = JSON.parse(readFile(this.mfs, 'vue-ssr-server-bundle.json'));
    this.rebase();
  }

  private static rebase() {
    if (!this.bundle || !this.clientManifest) {
      return;
    }

    this.cb(this.bundle, {
      template: this.template,
      clientManifest: this.clientManifest,
    });
    this.ready();
  }
}
