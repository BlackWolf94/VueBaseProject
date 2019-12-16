/**
 * @author Dimitry Zataidukh
 * @email zidadindimon@gmail.com
 * @created_at 11/24/19
 */

import { ApiController } from '../ApiController';
import { Get, Param } from '@nestjs/common';
import LocaleHelper from '../../../helper/LocaleHelper';

@ApiController('locale')
export default class LocaleController {

  @Get(':lang')
  async index(@Param('lang') lang: string) {
    return LocaleHelper.getLocale(lang);
  }

}
