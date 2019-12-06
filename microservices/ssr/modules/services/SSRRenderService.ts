/**
 * @author Dmytro Zataidukh
 * @email zidadindimon@gmail.com
 * @created_at 06.12.19
 */

import { Injectable, Logger } from '@nestjs/common';
import { BundleRenderer, createBundleRenderer } from 'vue-server-renderer';
import { SSRBuildService } from './SSRBuildService';
import AppHelper from '../../../../common/helper/AppHelper';
import { FileHelper } from '../../../../common/helper/FileHelper';
import { TSSRContext } from '../../../../common/types/TSSR';

@Injectable()
export default class SSRRenderService {

  static async initRender() {
    if(AppHelper.isProd()) {
      const template = await FileHelper.readFile(AppHelper.ssrTemplatePath(), 'utf-8');
      const bundle = JSON.parse(await FileHelper.readFile(AppHelper.ssrBundle(), 'utf-8'));
      const clientManifest = JSON.parse(await FileHelper.readFile(AppHelper.ssrManifest(), 'utf-8'));
      const renderOptions = Object.assign(AppHelper.ssrOptions(), {template, clientManifest});

      this.render = createBundleRenderer(bundle, renderOptions);
    } else {
      SSRBuildService.onReady( (bundle, renderOptions) => {
        this.render = createBundleRenderer(bundle, renderOptions);
        Logger.debug('ssr render initialized', 'SSRRenderService');
      });
      SSRBuildService.build();
    }
  }
  private static render: BundleRenderer;

  render(context: TSSRContext): Promise<string> {
    const s = new Date();

    return new Promise<string>((resolve, reject) => {
      SSRRenderService.render.renderToString(context, (err: any, html: string) => {
        if (err) {
          reject(err);
        }
        Logger.debug(`render page ${context.url}: ${(new Date()).valueOf() - s.valueOf()}ms`, 'SSR SERVICE');
        resolve(html);
      });
    });
  }

}
