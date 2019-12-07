/**
 * @author Dmytro Zataidukh
 * @email zidadindimon@gmail.com
 * @created_at 05.12.19
 */

import { INestApplication, Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { NestApplication } from '@nestjs/core';

@Injectable()
export default class SSRDevService {

  @Client({
    transport: Transport.TCP,
    options: {
      port: 5000
    }
  })
  client: ClientProxy;

  async render(context: any) {
    const response = await this.client.send<string>({ type: 'ssr-render' }, context);
    return response.toPromise();
  }

  async asset(fileName: string) {
    const response = await this.client.send<string>({ type: 'ssr-assets' }, fileName);
    return response.toPromise();
  }

}
