import { Module } from '@nestjs/common';
import { WebController } from './controllers/WebController';
import SSRService from './service/SSRService';
import SSRContext from './service/SSRContext';

@Module({
    imports: [],
    controllers: [WebController],
    providers: [SSRService, SSRContext],
})
export default class WebModule {}
