/**
 * @author Dimitry Zataidukh
 * @email zidadindimon@gmail.com
 * @created_at 11/24/19
 */

import { Bar } from 'cli-progress';
import chalk from 'chalk';
import { Ti18nConf } from '../conf';
import { resolve } from 'path';
import { FileHelper } from '../../../common/helper/FileHelper';

type TLangs = {
  [key: string]: any;
};

export class ParseService {
  pattern: RegExp;
  private progress: Bar;
  private locale: TLangs = {};

  constructor(private entry: string, private conf: Ti18nConf) {
    this.progress = new Bar({
      format: chalk.yellow(`Scan entry: ${entry} [{bar}] {percentage}% | {value}/{total} `)
    });
    this.pattern = conf.parseRegExp[entry] ? new RegExp(conf.parseRegExp[entry], 'gm') : null;
  }

  async run() {
    if (!this.pattern) {
      return;
    }

    const files = await FileHelper.scanDir(`src/${this.entry}`);
    this.progress.start(files.length, 0);

    for (const index in files) {
      await this.parseFile(files[index], Number(index) + 1);
    }

    this.progress.stop();
    return Promise.all(this.conf.languages.map(this.makeLangFile.bind(this)));
  }

  private async parseFile(file: string, index: number) {
    const content = await FileHelper.readFile(file);
    let messages: any;

    while ((messages = this.pattern.exec(content)) !== null) {
      if (messages.index === this.pattern.lastIndex) {
        this.pattern.lastIndex++;
      }
      this.conf.languages.forEach((lang: string) => (this.addMessage(lang, messages[1])));
    }
    this.progress.update(index);
  }

  private async makeLangFile(lang: string) {
    const localeFile = resolve(process.cwd(), this.conf.outputDir, this.entry, `${lang}.json`);
    const locale = JSON.parse(await FileHelper.readFile(localeFile) || '{}');

    const keys = Object.keys(this.locale[lang]);
    /**
     * remove old key that not exit in project file
     */
    Object.keys(locale).forEach( key => {
      if (!keys.includes(key)) {
        delete locale[key];
      }
    });

    await FileHelper.writeFile(localeFile, JSON.stringify({ ...this.locale[lang], ...locale}, null, '\t'));
    console.log(chalk.green(`Update locale file: ${localeFile}`));
  }

  private addMessage(lang: string, message: string) {
    if (!this.locale[lang]) {
      this.locale[lang] = {};
    }
    this.locale[lang][message] = this.conf.currentLang === lang ? message : '';
    return this;
  }
}
