/**
 * @author Dimitry Zataidukh
 * @email zidadindimon@gmail.com
 * @created_at 11/24/19
 */

import axios from 'axios';
import chalk from 'chalk';
import { Ti18nConf } from '../conf';
import { resolve } from 'path';
import { Bar } from 'cli-progress';
import { FileHelper } from '../../../common/helper/FileHelper';

export class TranslateService {
  private static async translate(message: string, from: string, to: string): Promise<string> {
    const msg = '';
    try {
      const {data} = await axios.get('https://api.mymemory.translated.net/get', {
        params: {
          q: message,
          langpair: `${from}|${to}`
        }
      });
      return data.responseData.translatedText || '' ;
    } catch (e) {
      console.log(chalk.red(e));
    }
    return msg;
  }

  constructor(private entry: string, private conf: Ti18nConf) {}

  async run() {
    const langs = this.conf.languages
      .filter( (lang) => lang !== this.conf.currentLang);
    for (const lang of  langs) {
      await this.translateFile(lang);
    }

    console.log(chalk.green('Translate DONE'));
    return;
  }

  async translateFile(lang: string) {
    const progress = new Bar({
      format: chalk.yellow(`Translate entry: ${this.entry}: ${lang} [{bar}] {percentage}% | {value}/{total} `)
    });

    const localeFile = resolve(process.cwd(),  this.conf.outputDir, this.entry, `${lang}.json`);
    const content = JSON.parse(await FileHelper.readFile(localeFile) || '{}');
    const messages = Object.keys(content)
      .filter( (key) => !content[key]);
    progress.start(messages.length, 0);

    for (const idx in messages) {
      const message = messages[idx];
      content[message] = await TranslateService.translate(message, this.conf.currentLang, lang);
      progress.update(Number(idx) + 1);
    }
    await FileHelper.writeFile(localeFile, JSON.stringify(content, null, '\t'));
    progress.stop();
  }
}
