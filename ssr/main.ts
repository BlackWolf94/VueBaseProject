import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SSRModule } from './modules/SSRModule';
import { Transport } from '@nestjs/microservices';
import { SSRBuildService } from './modules/services/SSRBuildService';

/**
 * @author Dmytro Zataidukh
 * @email zidadindimon@gmail.com
 * @created_at 05.12.19
 */

const bootstrap = async () => {
  const app = await NestFactory.createMicroservice(SSRModule, {
    transport: Transport.TCP,
    options: {
      port: 5000,
      retryAttempts: 5, retryDelay: 1000
    }
  });
  await SSRBuildService.build();

  await app.listenAsync();
  Logger.log(`SSR Server start`, 'LISTEN');
};
bootstrap();

