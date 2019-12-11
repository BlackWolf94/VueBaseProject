/**
 * @author Dmytro Zataidukh
 * @email zidadindimon@gmail.com
 * @created_at 02.12.19
 */
import AppHelper from '../../../common/helper/AppHelper';
import { FileHelper } from '../../../common/helper/FileHelper';


export default class LocaleHelper {
  static defLang: string = 'en';

  static async getLocale(lang: string, path: 'web' | 'server' = 'web'): Promise<any> {
    const vuetifyLocales = (await import(`vuetify/es5/locale/${lang}`)).default;
    const locale = await FileHelper.readFile(AppHelper.pathResolve(`locale/${path}/${lang}.json`)) || '{}';
    return {...vuetifyLocales, ...JSON.parse(locale)};
  }

  static async isLangAvailable(lang: string): Promise<boolean> {
    return  !! (await FileHelper.readFile(AppHelper.pathResolve(`locale/web/${lang}.json`))) ;
  }
}
