/**
 * @author Dmytro Zataidukh
 * @created_at 11/23/19
 */
import chalk from 'chalk';
import * as figlet from 'figlet';
import defaultConf from './conf';
import { ParseService } from './service/ParseService';
import { TranslateService } from './service/TranslateService';


console.log(chalk.red(figlet.textSync('i18n CLI', { horizontalLayout: 'full' })));

const run = async () => {
  for (const entry of defaultConf.sourceDirs) {
    await new ParseService(entry, defaultConf).run();
    await new TranslateService(entry, defaultConf).run();
  }
};

run();




