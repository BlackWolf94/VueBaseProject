/**
 * @author Dmytro Zataidukh
 * @email zidadindimon@gmail.com
 * @created_at 05.12.19
 */

import { Module } from '@nestjs/common';
import AppController from './AppController';
import SSRRenderService from './services/SSRRenderService';

@Module({
  controllers: [
    AppController
  ],
  providers: [
    SSRRenderService
  ]
})
export class SSRModule {
}
