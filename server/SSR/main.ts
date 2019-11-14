import { NestFactory } from '@nestjs/core';
import {DevService} from './service/DevService';
import {SSRModule} from './SSRModule';
import AppHelper from '../helper/AppHelper';
import {Logger} from '@nestjs/common';

DevService.buildAll();
async function bootstrap() {
    const app = await NestFactory.create(SSRModule);
    DevService.instant(app);
    await app.listen(AppHelper.ssrDevPort());
    Logger.debug(`start on http://localhost:${AppHelper.ssrDevPort()}`, 'SSR dev server');
}
// bootstrap();
