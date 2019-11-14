import {Injectable} from '@nestjs/common';
import {FileHelper} from '../../../helper/FileHelper';
import AppHelper from '../../../helper/AppHelper';
import {BundleRenderer, createBundleRenderer} from 'vue-server-renderer';


@Injectable()
export default class SSRService {

    public static async initRender() {
        const template = await FileHelper.readFile(AppHelper.ssrTemplatePath(), 'utf-8');
        const bundle = JSON.parse(await FileHelper.readFile(AppHelper.ssrBundle(), 'utf-8'));
        const clientManifest = JSON.parse(await FileHelper.readFile(AppHelper.ssrManifest(), 'utf-8'));
        const renderOptions = Object.assign(AppHelper.ssrOptions(), {template, clientManifest});


        this.render = createBundleRenderer(bundle, renderOptions);
    }

    private static render: BundleRenderer;

    public render(url: string): Promise<string> {

        return new Promise<string>((resolve, reject) => {
            SSRService.render.renderToString({url, title: AppHelper.getEnv('TITLE')}, (err: any, html: string) => {
                if (err) {
                    reject(err);
                }
                resolve(html);
            });
        });
    }


}
