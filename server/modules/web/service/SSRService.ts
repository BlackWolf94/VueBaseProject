import { INestApplication, Injectable, Logger } from '@nestjs/common';
import { BundleRenderer, BundleRendererOptions, createBundleRenderer } from 'vue-server-renderer';
import { FileHelper } from '../../../../common/helper/FileHelper';
import AppHelper from '../../../../common/helper/AppHelper';
import { TSSRContext } from '../../../../common/types/TSSR';
import { SSRBuildConf } from './webpack/untils/SSRBuildConf';
import chokidar from 'chokidar';
import { WpClient, WpServe } from './webpack';
import webpack, { HotModuleReplacementPlugin, Stats } from 'webpack';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';
import MFS from 'memory-fs';


let renderDone: (value?: (PromiseLike<any> | any)) => void = null;


@Injectable()
export default class SSRService {

  protected dfs: MFS;
  protected mfs: MFS;
  protected manifest: any;
  protected bundle: any;
  protected template: string;

  protected bundleRender: BundleRenderer;

  async build(app: INestApplication) {
    return AppHelper.isProd() ? this.buildProdApp() : this.buildDevApp(app);
  }

  render(context: TSSRContext): Promise<string> {
    const s = new Date();

    return new Promise<string>((resolve, reject) => {
      this.bundleRender.renderToString(context, (err: any, html: string) => {
        if (err) {
          reject(err);
        }
        Logger.debug(`render page ${context.url}: ${(new Date()).valueOf() - s.valueOf()}ms`, 'SSR SERVICE');
        resolve(html);
      });
    });
  }

  getAssets(fileName: string) {
    return FileHelper.readFile(SSRBuildConf.assetPath(fileName), 'utf-8', this.dfs);
  }

  protected buildClient(): Promise<any> {
    return new Promise<any>( (resolve) => webpack(WpClient).run(resolve));
  }

  protected buildServer(): Promise<any> {
    return new Promise<any>( (resolve) => webpack(WpServe).run(resolve));
  }

  protected async buildProdApp() {
    const s = new Date();
    await this.buildClient();
    await this.buildServer();

    this.template = await FileHelper.readFile(SSRBuildConf.template, 'utf-8');
    this.bundle = JSON.parse(await FileHelper.readFile(SSRBuildConf.bundle, 'utf-8'));
    this.manifest = JSON.parse(await FileHelper.readFile(SSRBuildConf.manifest, 'utf-8'));
    this.onReady(AppHelper.ssrOptions() as BundleRendererOptions);
    Logger.debug(`Build production  App from: ${(new Date()).valueOf() - s.valueOf()}ms`, this.constructor.name);
  }

  protected async buildDevApp(app: INestApplication) {
    this.template = await FileHelper.readFile(SSRBuildConf.template);
    chokidar.watch(SSRBuildConf.template).on('change', this.watchTemplate.bind(this));

    // modify client config to work with hot middleware
    (WpClient.entry as any).app = ['webpack-hot-middleware/client', (WpClient.entry as any).app];
    WpClient.output.filename = 'js/[name].js';
    WpClient.plugins.push(
      new HotModuleReplacementPlugin()
    );
    WpClient.optimization.noEmitOnErrors = true;

    // dev middleware
    const clientCompiler = webpack(WpClient);

    const devMiddleware = WebpackDevMiddleware(clientCompiler, {
      publicPath: WpClient.output.publicPath
    });
    app.use(devMiddleware);
    this.dfs = devMiddleware.fileSystem;

    clientCompiler.hooks.done.tap('dev server', this.watchClient.bind(this));

    const hotMiddleware = WebpackHotMiddleware(clientCompiler, { heartbeat: 5000 });
    app.use(hotMiddleware);

    const serverCompiler = webpack(WpServe);
    this.mfs = new MFS();
    serverCompiler.outputFileSystem = this.mfs;
    serverCompiler.watch({}, this.watchServer.bind(this));

    return new Promise<any>((resolve) => (renderDone = resolve));
  }

  protected onReady(options: BundleRendererOptions = {}) {
    if (!this.bundle || !this.manifest) {
      return;
    }
    this.bundleRender = createBundleRenderer(this.bundle, {
      runInNewContext: false,
      basedir: SSRBuildConf.outDir,
      template: this.template,
      clientManifest: this.manifest,
      ...options
    });
    Logger.debug(`Render complete`, this.constructor.name);

    // tslint:disable-next-line:only-arrow-functions
    renderDone = renderDone || function() {};
    renderDone();
  }

  protected async watchTemplate() {
      this.template = await FileHelper.readFile(SSRBuildConf.template);
      Logger.debug(`Change: ${SSRBuildConf.template}`, this.constructor.name);
      this.onReady();
  }

  protected handleCompileErrors(stats: Stats) {
      stats.compilation.errors.forEach((err) => {
          Logger.error(err, this.constructor.name);
      });

      stats.compilation.warnings.forEach((warn) => {
          Logger.warn(warn, this.constructor.name);
      });

      if (stats.hasErrors()) {
          throw stats.compilation.errors.toString();
      }
  }

  protected async watchClient(stats: Stats) {
      this.handleCompileErrors(stats);
      this.manifest = JSON.parse( await FileHelper.readFile(SSRBuildConf.manifest, 'utf-8',  this.dfs));
      Logger.debug(`Change: ${SSRBuildConf.manifest}`, this.constructor.name);
      this.onReady();
  }

  protected async watchServer(err: Error, stats: Stats) {
      this.handleCompileErrors(stats);
      this.bundle = JSON.parse(await FileHelper.readFile(SSRBuildConf.bundle, 'utf-8', this.mfs));
      Logger.debug(`Change: ${SSRBuildConf.bundle}`, this.constructor.name);
      this.onReady();
  }
}
