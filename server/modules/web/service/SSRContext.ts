/**
 * @author Dmytro Zataidukh
 * @email zidadindimon@gmail.com
 * @created_at 02.12.19
 */

import { Injectable } from '@nestjs/common';
import { TSSRContext, TSSRMeta } from '../types/TSSR';
import LocaleHelper from '../../../helper/LocaleHelper';


@Injectable()
export default class SSRContext {

  async makeContext(url: string, lang: string = 'en' ): Promise<TSSRContext> {
    return {
      baseUrl: `/${lang}`,
      currentLang: lang,
      locale: await LocaleHelper.getLocale(lang),
      meta: await this.generateMeta(lang),
      title: 'App',
      url,
      user: {}
    };
  }

  private async generateMeta(lang: string): Promise<TSSRMeta> {
    return {};
  }
}
