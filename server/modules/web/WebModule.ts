import { Module } from '@nestjs/common';
import { WebController } from './controllers/WebController';
import SSRService from './service/SSRService';

@Module({
    imports: [],
    controllers: [WebController],
    providers: [SSRService],
})
export default class WebModule {}
