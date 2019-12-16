/**
 * @author Dmytro Zataidukh
 * @created_at 11/23/19
 */
export type Ti18nConf = {
  outputDir: string;
  sourceDirs: string[];
  currentLang: string;
  languages: string[];
  parseRegExp: {
    [key: string]: RegExp;
  };
};

export default {
  outputDir: 'locale',
  sourceDirs: [
    'web',
    'server'
  ],
  currentLang: 'en',
  languages: [
    'uk',
    'ru',
    'en'
  ],
  parseRegExp: {
    web: /\$t\(['|"]([\w|\s|\{|\}]+)['|"][,|\)]/
  }
} as Ti18nConf;
