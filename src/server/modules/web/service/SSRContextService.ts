/**
 * @author Dmytro Zataidukh
 * @email zidadindimon@gmail.com
 * @created_at 02.12.19
 */

import { Injectable } from '@nestjs/common';
import { TSSRAppConf, TSSRContext, TSSRMeta } from '@common/types/TSSR';
import LocaleHelper from '../../../helper/LocaleHelper';


@Injectable()
export default class SSRContextService {

  async context(url: string, lang: string = 'en'): Promise<TSSRContext> {
    const appConf = await this.conf(lang);
    const meta = await this.meta(lang);
    return {
      url,
      title: await this.title(lang),
      meta: Object.keys(meta).map( (key) => `<meta name="${key}" content="${meta[key]}">`).join('\n'),
      appConf,
      appContext: JSON.stringify(appConf)
    };
  }

  private async meta(lang: string): Promise<TSSRMeta> {
    return {
      author: 'Dmytro Zataidukh',
      lang
    };
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
