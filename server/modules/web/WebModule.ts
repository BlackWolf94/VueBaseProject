import { Module } from '@nestjs/common';
import { WebController } from './controllers/WebController';
import SSRService from './service/SSRService';
import SSRContext from './service/SSRContext';
import SSRDevService from './service/SSRDevService';

@Module({
    imports: [],
    controllers: [WebController],
    providers: [SSRService, SSRContext, SSRDevService],
})
export default class WebModule {}
