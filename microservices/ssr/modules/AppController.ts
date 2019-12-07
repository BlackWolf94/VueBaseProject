/**
 * @author Dmytro Zataidukh
 * @email zidadindimon@gmail.com
 * @created_at 05.12.19
 */

import { Controller} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import SSRRenderService from './services/SSRRenderService';
import { TSSRContext } from '@common/types/TSSR';
import { SSRBuildService } from './services/SSRBuildService';

@Controller()
export default class AppController {

  constructor(private ssr: SSRRenderService) {
  }

  @MessagePattern({ type: 'ssr-render' })
  index(context: TSSRContext) {
    return this.ssr.render(context);
  }

  @MessagePattern({ type: 'ssr-middleware' })
  middleware(): any[] {
    return [SSRBuildService.devMiddleware, SSRBuildService.hotMiddleware];
  }

  @MessagePattern({ type: 'ssr-assets' })
  assets(fileName: string): string {
    return SSRBuildService.getAsset(fileName);
  }
}
