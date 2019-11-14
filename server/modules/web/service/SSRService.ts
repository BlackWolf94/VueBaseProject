import {Injectable} from '@nestjs/common';
import {FileHelper} from '../../../helper/FileHelper';
import AppHelper from '../../../helper/AppHelper';
import {BundleRenderer, createBundleRenderer} from 'vue-server-renderer';
import LRU from 'lru-cache';

@Injectable()
export default class SSRService {
    private template: string;
    private bundle: any;
    private manifest: any;
    private renderer: BundleRenderer;

    constructor() {
        this.init();
    }

    public render(url: string): Promise<string> {

        return new Promise<string>((resolve, reject) => {
            this.renderer.renderToString({url, title: AppHelper.getEnv('TITLE')}, (err: any, html: string) => {
                if (err) { reject(err); }
                resolve(html);
            });
        });
    }

    private async init() {
        this.template = await FileHelper.readFile(AppHelper.ssrTemplatePath(), 'utf-8');
        this.bundle = JSON.parse(await FileHelper.readFile(AppHelper.ssrBundle(), 'utf-8'));
        this.manifest = JSON.parse(await FileHelper.readFile(AppHelper.ssrManifest(), 'utf-8'));
        this.renderer = createBundleRenderer(this.bundle, {
            template: this.template,
            clientManifest: this.manifest,
            runInNewContext: false,
            basedir: AppHelper.pathResolve('./dist'),
            cache: new LRU({
                max: 1000,
                maxAge: 1000 * 60 * 15,
            }),
        });
    }
}
