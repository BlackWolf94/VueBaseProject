import { Module } from '@nestjs/common';
import { WebController } from './controllers/WebController';
import SSRService from './service/SSRService';
import SSRContextService from './service/SSRContextService';

@Module({
    imports: [],
    controllers: [WebController],
    providers: [SSRService, SSRContextService],
})
export default class WebModule {}
