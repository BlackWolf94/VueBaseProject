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
  static client: ClientProxy;

  static async connect(app: INestApplication) {
    console.error(this.client);
  }


  async render(context: any) {
    // const response = await this.client.send<string>(
    //   { type: 'sum' },
    //   context
    // );
    // return response.toPromise();
  }

}
