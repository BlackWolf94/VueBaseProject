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

  async makeContext(url: string, lang: string = 'en' ): Promise<TSSRContext> {
    return {
      baseUrl: `/`,
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
