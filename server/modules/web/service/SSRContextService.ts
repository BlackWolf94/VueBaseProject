/**
 * @author Dmytro Zataidukh
 * @email zidadindimon@gmail.com
 * @created_at 02.12.19
 */

import { Injectable } from '@nestjs/common';
import LocaleHelper from '../../../../common/helper/LocaleHelper';
import { TSSRContext, TSSRMeta } from '../../../../common/types/TSSR';


@Injectable()
export default class SSRContextService {

  async makeContext(url: string, lang: string = 'en'): Promise<TSSRContext> {
    return {
      title: 'App',
      meta: await this.generateMeta(lang),
      content: JSON.stringify({
        baseUrl: `/${lang}/`,
        currentLang: lang,
        locale: await LocaleHelper.getLocale(lang),
        url,
        user: {}
      }, null),
      state: {
        app: {
          baseUrl: `/${lang}/`,
          currentLang: lang,
          locale: await LocaleHelper.getLocale(lang),
          url,
          user: {}
        }
      }
    };
  }

  private async generateMeta(lang: string): Promise<TSSRMeta> {
    return {};
  }
}
