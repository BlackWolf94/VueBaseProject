import { NestFactory } from '@nestjs/core';
import AppModule from './modules/AppModule';
import AppHelper from './helper/AppHelper';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(AppHelper.port());
}
bootstrap();
