/**
 * @author Dmytro Zataidukh
 * @email zidadindimon@gmail.com
 * @created_at 02.12.19
 */

import { Injectable } from '@nestjs/common';
import LocaleHelper from '../../../../common/helper/LocaleHelper';
import { TSSRAppConf, TSSRContext, TSSRMeta } from '../../../../common/types/TSSR';


@Injectable()
export default class SSRContextService {

  async context(url: string, lang: string = 'en'): Promise<TSSRContext> {
    const appConf = await this.conf(lang);
    return {
      url,
      title: await this.title(lang),
      meta: await this.meta(lang),
      appConf,
      appContext: JSON.stringify(appConf)
    };
  }

  private async meta(lang: string): Promise<TSSRMeta> {
    return {};
  }

  private async title(lang: string): Promise<string> {
    return `App ${lang}`;
  }

  private async conf(lang: string): Promise<TSSRAppConf> {
    return {
      router: {
        baseUrl: `/${lang}/`
      },
      i18n: {
        currentLang: lang,
        locale: await LocaleHelper.getLocale(lang),
      }
    };
  }
}
