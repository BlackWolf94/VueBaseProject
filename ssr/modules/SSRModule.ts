/**
 * @author Dmytro Zataidukh
 * @email zidadindimon@gmail.com
 * @created_at 05.12.19
 */

import { Module } from '@nestjs/common';
import AppController from './AppController';
import SSRService from './services/SSRService';

@Module({
  controllers: [
    AppController
  ],
  providers: [
    SSRService
  ]
})
export class SSRModule {
}
