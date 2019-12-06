import { NestFactory } from '@nestjs/core';
import AppModule from './modules/AppModule';
import express from 'express';
import compression from 'compression';
import SSRService from './modules/web/service/SSRService';
import {Logger} from '@nestjs/common';
import internalIp from 'internal-ip';
import { Transport } from '@nestjs/microservices';
import SSRDevService from './modules/web/service/SSRDevService';
import AppHelper from '../common/helper/AppHelper';

const serve = (path: string, cache: any) => express.static(AppHelper.pathResolve(path), {
  maxAge: cache && AppHelper.isProd() ? 1000 * 60 * 60 * 24 * 30 : 0,
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: 5000,
    }
  });

  if (AppHelper.isDev()) {
    app.enableCors();
  }

  app.use(compression({threshold: 0}));
  app.use('/dist', serve('./dist', true));
  app.use('/public', serve('./public', true));
  if (AppHelper.isProd()) {
    await SSRService.initRender();
  }
  await app.listen(AppHelper.port());


  Logger.log(`Server start http://localhost:${AppHelper.port()}`, 'LISTEN');
  Logger.log(`Server start http://${internalIp.v4.sync()}:${AppHelper.port()}`, 'LISTEN');
}

bootstrap();
