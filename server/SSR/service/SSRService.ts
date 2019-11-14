/**
 * @author Dmytro Zataidukh
 * @created_at 11/13/19
 */
import {Injectable, Logger} from '@nestjs/common';
import {DevService} from './DevService';
import AppHelper from '../../helper/AppHelper';
import {BundleRenderer, createBundleRenderer} from 'vue-server-renderer';
import LRU from 'lru-cache';
import {distDir} from '../webpack/_env';

@Injectable()
export class SSRService {

    private ssr: DevService;

    private render: BundleRenderer;

    constructor() {
        this.ssr = new DevService(AppHelper.ssrTemplatePath(), this.makeRender.bind(this));
    }

    public async serve(url: string): Promise<string> {
        await this.ssr.ready();
        return this.compile(url);
    }

    private makeRender(bundle: any, options: any = {}) {
        this.render = createBundleRenderer(bundle, {
            ...options,
            cache: new LRU({
                max: 1000,
                maxAge: 1000 * 60 * 15,
            }),
            basedir: distDir,
            runInNewContext: false});
    }

    private compile(url: string, title: string = AppHelper.getEnv('TITLE')): Promise<string> {
        const s = Date.now();
        const constext = {url, title};
        return new Promise<string>((resolve, reject) => {
            this.render.renderToString(constext, (error: any, html: string) => {
                if (error) {
                    reject(error);
                }
                Logger.debug(`Template compile request: ${Date.now() - s}ms`, 'SSR dev server');
                resolve(html);
            });
        });
    }


}
