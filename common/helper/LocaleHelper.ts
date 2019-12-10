/**
 * @author Dmytro Zataidukh
 * @email zidadindimon@gmail.com
 * @created_at 02.12.19
 */

import { FileHelper } from './FileHelper';
import AppHelper from './AppHelper';


export default class LocaleHelper {
  static defLang: string = 'en';

  static async getLocale(lang: string, path: 'web' | 'server' = 'web'): Promise<any> {
    const locale = await FileHelper.readFile(AppHelper.pathResolve(`locale/${path}/${lang}.json`)) || '{}';
    return JSON.parse(locale);
  }

  static async isLangAvailable(lang: string): Promise<boolean> {
    return  !! (await FileHelper.readFile(AppHelper.pathResolve(`locale/web/${lang}.json`))) ;
  }
}
