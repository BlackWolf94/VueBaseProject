/**
 * @author Dmytro Zataidukh
 * @email zidadindimon@gmail.com
 * @created_at 05.12.19
 */

import { Controller, Get, Param } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { JSON_CONFIG_FILENAME } from 'tslint/lib/configuration';

@Controller()
export default class AppController {

  @MessagePattern({ type: 'sum' })
  index(context: any  = '') {
    console.error(context)
    return JSON.stringify(context);
  }

  // @MessagePattern({ type: 'sum' })
  // async accumulate(data: number[]): Promise<number> {
  //   return (data || []).reduce((a, b) => a + b);
  // }
}
