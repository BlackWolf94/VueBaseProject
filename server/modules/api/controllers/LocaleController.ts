/**
 * @author Dimitry Zataidukh
 * @email zidadindimon@gmail.com
 * @created_at 11/24/19
 */

import { ApiController } from '../ApiController';
import { Get, Param } from '@nestjs/common';
import { FileHelper } from '../../../helper/FileHelper';
import AppHelper from '../../../helper/AppHelper';

@ApiController('locale')
export default class LocaleController {

  @Get(':lang')
  async index(@Param('lang') lang: string) {
    const locale = await FileHelper.readFile(AppHelper.pathResolve(`locale/web/${lang}.json`)) || '{}';
    return JSON.parse(locale);
  }

}
