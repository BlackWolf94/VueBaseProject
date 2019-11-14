import { NestFactory } from '@nestjs/core';
import AppModule from './modules/AppModule';
import AppHelper from './helper/AppHelper';
import express from 'express';
import compression from 'compression';

const serve = (path: string, cache: any) => express.static(AppHelper.pathResolve(path), {
  maxAge: cache && AppHelper.isProd() ? 1000 * 60 * 60 * 24 * 30 : 0,
});


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(compression({threshold: 0}));
  app.use('/dist', serve('./dist', true));
  app.use('/public', serve('./public', true));

  await app.listen(AppHelper.port());
}
bootstrap();
